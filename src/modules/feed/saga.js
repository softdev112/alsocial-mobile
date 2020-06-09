// @flow
import type { Saga } from "redux-saga";
import { takeLatest, call, select } from "redux-saga/effects";
import * as actions from "./actions";
import * as feedApi from "service/axios/feed";
import { getUserId } from "../user/selectors";
import activityObservables from "observable/activity";

function* fetchFeedWorker({ feedGroup, feedId, next, callback }): Saga<void> {
    try {
        callback({ isLoading: true, curNext: next });
        const data = yield call(feedApi.fetchActivityFeeds, {
            feedGroup,
            feedId,
            next,
        });
        callback({ ...data, isLoading: false, curNext: next });
    } catch (e) {
        yield console.error(e);
        callback({ isLoading: false, error: e, curNext: next });
    }
}

function* fetchTimelineFeedWorker({ payload: { next, callback } }): Saga<void> {
    try {
        const userId = yield select(getUserId);
        yield call(fetchFeedWorker, { feedGroup: "timeline", feedId: userId, next, callback });
    } catch (e) {
        yield console.error(e);
    }
}

function* fetchExploreFeedWorker({ payload: { offset, callback } }): Saga<void> {
    try {
        callback({ isLoading: true, offset });
        const data = yield call(feedApi.fetchExploreFeeds, offset);
        callback({ ...data, isLoading: false, offset });
    } catch (e) {
        yield console.error(e);
        callback({ isLoading: false, error: e, offset });
    }
}

function* fetchHashtagFeedWorker({ payload: { next, hashtag, callback } }): Saga<void> {
    try {
        callback({ isLoading: true, curNext: next });
        const data = yield call(feedApi.fetchHashtagFeeds, hashtag, next);
        callback({ ...data, isLoading: false, curNext: next });
    } catch (e) {
        yield console.error(e);
        callback({ isLoading: false, error: e, curNext: next });
    }
}

function* fetchSingleFeedWorker({ payload: { activity } }): Saga<void> {
    const activityId = activity?.id;
    try {
        activityObservables.modules.loadActivity.loading(activityId);
        const { results } = yield call(
            feedApi.fetchSingleActivity,
            "user",
            activity?.actor?.id,
            activity?.id,
        );
        if (results) {
            activityObservables.modules.loadActivity.success(
                activityId,
                results.length ? results[0] : null,
            );
        } else {
            activityObservables.modules.loadActivity.failed(activityId);
        }
    } catch (e) {
        yield call(console.error, e);
        activityObservables.modules.loadActivity.failed(activityId);
    }
}

export default function*(): Saga<void> {
    yield takeLatest(actions.loadTimelineFeed, fetchTimelineFeedWorker);
    yield takeLatest(actions.loadExploreFeed, fetchExploreFeedWorker);
    yield takeLatest(actions.loadHashtagFeed, fetchHashtagFeedWorker);
    yield takeLatest(actions.loadSingleActivity, fetchSingleFeedWorker);
}
