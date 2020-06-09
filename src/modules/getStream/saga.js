// @flow
import { call, put, select, take, takeLatest, fork, all } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import StreamClient from "service/GetStreamClient";
import * as actions from "./actions";
import { getUserId, getUserStreamToken, getUserToken } from "../user/selectors";
import R from "res/R";
import timelineObservables from "observable/timeline";
import notificationObservables from "observable/notification";
import { fetchNotifications } from "../notification/actions";

let streamClient;

export function* initGetStreamClientWorker(): Saga {
    const userId = yield select(getUserId);
    const streamToken = yield select(getUserStreamToken);
    const userToken = yield select(getUserToken);

    const credentials = {
        apiKey: R.configs.STREAM.API_KEY,
        userToken,
        appId: R.configs.STREAM.APP_ID,
        streamToken,
        baseUrl: R.configs.SOCIAL_BASE_URI,
    };

    streamClient = yield call(StreamClient, credentials, userId);

    global.streamClient = streamClient._streamJSClient;

    yield all([
        call(realtimeNotificationWatcher),
        call(realtimeTimelineWatcher),
        call(realtimeProfileFeedWatcher),
    ]);
}

export function* realtimeNotificationWatcher(): Saga {
    const channel = yield call([streamClient, streamClient.notificationChannel]);

    while (true) {
        yield take(channel);
        yield put(fetchNotifications({ markSeen: false }));
    }
}

export function* realtimeTimelineWatcher(): Saga {
    const channel = yield call([streamClient, streamClient.timelineChannel]);

    while (true) {
        const infoChannel = yield take(channel);

        if (infoChannel?.new?.length) {
            const userId = yield select(getUserId);

            if (infoChannel.new.some(({ actor: { id } }) => userId === id)) {
                timelineObservables.modules.newTimeline.hasNewTimeline(
                    true,
                    infoChannel.new.length,
                );
            } else {
                timelineObservables.modules.newTimeline.hasNewTimeline(
                    false,
                    infoChannel.new.length,
                );
            }
        } else {
            // yield put(actions.loadGetStreamTimelineRequest({ silent: true }));
        }
    }
}

export function* realtimeProfileFeedWatcher(): Saga {
    const channel = yield call([streamClient, streamClient.profileFeedChannel]);

    while (true) {
        yield take(channel);
        yield put(actions.loadGetStreamProfileFeedRequest({ silent: true }));
    }
}

export function* getUserNotificationsWorker({ payload }: any): Saga {
    const { offset, mark_seen } = payload;
    const isNew = offset === 0;
    try {
        notificationObservables.modules.notification.loading(isNew);
        const notificationReference = yield call([
            streamClient,
            streamClient.notificationReference,
        ]);
        const { results } = yield call([notificationReference, notificationReference.get], {
            mark_seen,
            limit: 50,
            offset,
        });
        yield put(actions.loadGetStreamNotificationsSuccess(results));
        // callback({ results: results });
        notificationObservables.modules.notification.success(isNew, results);
    } catch (e) {
        yield console.error(e);
        // callback({ error: e });
        notificationObservables.modules.notification.failed(isNew);
    }
}

export default function*(): Saga<void> {
    yield takeLatest(actions.initGetStreamClient, initGetStreamClientWorker);
    yield takeLatest(actions.loadGetStreamNotificationsRequest, getUserNotificationsWorker);
}
