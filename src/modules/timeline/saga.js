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
import { getUserId } from "../user/selectors";
import * as apis from "service/axios/timeline";
import timelineObservables from "../../observable/timeline";

function* initTimelineWorker(): Saga<void> {
    let loadTask;
    while (true) {
        const { load } = yield race({
            load: take(actions.loadTimelineFeeds),
            loadFinished: take(actions.loadTimelineFeedsFinished),
        });
        if (loadTask) {
            yield cancel(loadTask);
        }
        loadTask = null;
        if (load) {
            loadTask = yield fork(fetchTimelineFeedWorker, load.payload);
        }
    }
}

function* initSuggestionsWorker(): Saga<void> {
    let loadTask;
    while (true) {
        const { load } = yield race({
            load: take(actions.loadSuggestions),
            finished: take(actions.loadSuggestionsFinished),
        });
        if (loadTask) {
            yield cancel(loadTask);
        }
        loadTask = null;
        if (load) {
            loadTask = yield fork(fetchSuggestionsWorker, load.payload);
        }
    }
}

function* fetchSuggestionsWorker({ page, per_page, callback }: Object): Saga<void> {
    if (!callback) {
        return;
    }
    try {
        callback({ isLoading: true });
        const response = yield call(apis.fetchSuggestionsRequest, page, per_page);
        if (Array.isArray(response)) {
            callback({ suggestions: response, page, isLoading: false });
        } else {
            callback({ isLoading: false });
        }
        yield put(actions.loadSuggestionsFinished());
    } catch (err) {
        yield console.log(err);
        callback({ error: err, isLoading: false });
        yield put(actions.loadSuggestionsFinished());
    } finally {
        if (yield cancelled()) {
            callback({ isLoading: false });
        }
    }
}

function* fetchTimelineFeedWorker({ next, callback }): Saga<void> {
    try {
        callback({ isLoading: true, curNext: next });
        const userId = yield select(getUserId);
        const data = yield call(apis.fetchActivityFeeds, {
            feedGroup: "timeline",
            feedId: userId,
            next,
        });
        callback({ ...data, isLoading: false, curNext: next });
        yield put(actions.loadTimelineFeedsFinished());
    } catch (e) {
        yield console.error(e);
        callback({ isLoading: false, error: e, curNext: next });
        yield put(actions.loadTimelineFeedsFinished());
    } finally {
        if (yield cancelled()) {
            callback({ isLoading: false });
        }
    }
}

function* fetchNewTimelineFeedWorker({ latestFeedId, limit }): Saga<void> {
    try {
        timelineObservables.modules.newFeeds.loading();
        const userId = yield select(getUserId);
        const { results, next } = yield call(apis.fetchActivityFeeds, {
            feedGroup: "timeline",
            feedId: userId,
            prev: latestFeedId,
            limit,
        });

        if (results) {
            timelineObservables.modules.newFeeds.success(results, next);
        } else {
            timelineObservables.modules.newFeeds.failed();
        }
        yield put(actions.loadNewTimelineFeedsFinished());
    } catch (error) {
        yield console.error(error);
        timelineObservables.modules.newFeeds.failed();
        yield put(actions.loadNewTimelineFeedsFinished());
    }
}

export default function*(): Saga<void> {
    yield takeLatest(actions.loadNewTimelineFeeds, fetchNewTimelineFeedWorker);
    while (yield take(actions.startTimeline)) {
        const timelineTask = yield fork(initTimelineWorker);
        const suggestionTask = yield fork(initSuggestionsWorker);

        yield take(actions.stopTimeline);

        yield cancel(timelineTask);
        yield cancel(suggestionTask);
    }
}
