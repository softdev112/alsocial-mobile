// @flow
import type { Saga } from "redux-saga";
import {
    all,
    take,
    takeLatest,
    call,
    select,
    race,
    fork,
    put,
    cancel,
    cancelled,
} from "redux-saga/effects";
import * as actions from "./actions";
import * as apis from "service/axios/explore";

function* initExploreWorker(): Saga<void> {
    let loadTask;
    while (true) {
        const { load } = yield race({
            load: take(actions.loadExploreFeed),
            finished: take(actions.loadExploreFeedFinished),
        });
        if (loadTask) {
            yield cancel(loadTask);
        }
        loadTask = null;
        if (load) {
            loadTask = yield fork(fetchExploreFeedWorker, load.payload);
        }
    }
}
function* fetchExploreFeedWorker({ offset, callback }): Saga<void> {
    try {
        callback({ isLoading: true, offset });
        const data = yield call(apis.fetchExploreFeeds, offset);
        callback({ ...data, isLoading: false, offset });
        yield put(actions.loadExploreFeedFinished());
    } catch (e) {
        yield console.error(e);
        callback({ isLoading: false, error: e, offset });
        yield put(actions.loadExploreFeedFinished());
    } finally {
        if (yield cancelled()) {
            callback({ isLoading: false });
        }
    }
}

export default function*(): Saga<void> {
    while (yield take(actions.startExplore)) {
        const exploreTask = yield fork(initExploreWorker);

        yield take(actions.stopExplore);

        yield cancel(exploreTask);
    }
}
