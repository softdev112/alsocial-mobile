// @flow
import { call, put, takeLatest, select } from "redux-saga/effects";
import { Saga } from "redux-saga";
import * as actions from "./actions";
import * as apis from "service/axios/notification";
import notificationObservables from "observable/notification";
import { getNotifications } from "./selectors";
import { uniqBy } from "lodash";

export function* fetchNotificationsWorker({ payload }: Object): Saga<void> {
    const { markSeen, from } = payload;
    let to;
    const notifications = yield select(getNotifications);
    if (!payload.hasOwnProperty("isRefresh") && !payload.hasOwnProperty("from")) {
        if (!!notifications.length) {
            to = notifications[0].id;
        }
    }

    try {
        notificationObservables.modules.loading(markSeen, from);
        const response = yield call(apis.fetchNotifications, to, from, markSeen);
        const { results, next, unseen } = response;
        if (results && Array.isArray(results)) {
            let newNotifications = [...results];
            if (to && !!results.length) {
                newNotifications.splice(results.length - 1, 1);
            }
            if (!payload.hasOwnProperty("from") && !to) {
                newNotifications = uniqBy([...newNotifications], "group");
            } else if (to) {
                newNotifications = uniqBy([...newNotifications], "group");
            } else {
                newNotifications = [...notifications];
            }
            if (newNotifications.length > 10) {
                newNotifications = newNotifications.splice(10, newNotifications.length - 10);
            }
            yield put(
                actions.fetchNotificationsSuccess({
                    newNotifications,
                    unseen: markSeen ? 0 : unseen,
                }),
            );
            notificationObservables.modules.success(markSeen, from, results, next);
        } else {
            notificationObservables.modules.failed(markSeen, from);
        }
    } catch (e) {
        console.error(e);
        notificationObservables.modules.failed(markSeen, from);
    }
}

export default function*(): Saga<void> {
    yield takeLatest(actions.fetchNotifications, fetchNotificationsWorker);
}
