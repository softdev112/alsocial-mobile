// @flow
import { takeLatest, takeEvery, call, select, fork, put } from "redux-saga/effects";
import { Alert } from "react-native";
import type { Saga } from "redux-saga";
import * as actions from "./actions";
import * as apis from "service/axios/follow";
import userObservables from "observable/user";
import R from "res/R";
import NavigationService from "service/Navigation";
import MixpanelService from "service/Mixpanel";
import getFeedGroup from "utils/getFeedGroup";

export function* fetchFollowersWorker({ payload }: any): Saga<void> {
    const { userId, page, type, callback } = payload;
    if (!callback) {
        return;
    }

    try {
        const results = yield call(apis.fetchFollowUsersRequest, userId, page, type);
        if (results?.error) {
            yield call(Alert.alert, results?.error);
            yield call(NavigationService.back);
        } else {
            callback({ results, page });
        }
    } catch (err) {
        callback({ page, error: err });
    }
}

function* updateFollowingStatusWorker({ payload }): Saga<void> {
    const { userId, action, type, activity } = payload;

    try {
        userObservables.modules.following.loading(userId);

        let data;
        let eventName = null;
        if (action === R.strings.button.fetching) {
            data = yield call(apis.fetchFollowingStatusRequest, userId);
            eventName = "requested";
        } else if (action === R.strings.button.following) {
            data = yield call(apis.updateFollowingStatusRequest, userId);
            eventName = "followed";
        } else if (action === R.strings.button.follow) {
            data = yield call(apis.deleteFollowingStatusRequest, userId);
            eventName = "unfollowed";
        } else if (action === R.strings.button.block) {
            data = yield call(apis.blockFollowingStatusRequest, userId);
        } else if (action === R.strings.button.unblock) {
            data = yield call(apis.deleteBlockFollowingStatusRequest, userId);
            if (data?.error && data?.error === "Unknown Error!") {
                data = { following: false };
            }
        }

        if (eventName) {
            if (activity && (type === "Explore" || type === "Hashtag")) {
                const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(
                    activity.attachments,
                );

                yield call(MixpanelService.trackEvent, "users followed", {
                    first_action_taken: eventName,
                    second_post_type: activity.verb === "post" ? "original posts" : "reposts",
                    third_media_type: activity.verb === "repost" ? "NA" : mediaTypes,
                    fourth_media_provider: mediaProviders,
                    fifth_feed_type: getFeedGroup(type),
                });
            } else {
                yield call(MixpanelService.trackEvent, "users followed", {
                    first_action_taken: eventName,
                });
            }
        }

        userObservables.modules.following.success(userId, data);
    } catch (err) {
        userObservables.modules.following.failed(userId);
    }
}

function* updateFollowRequestWorker({ payload }): Saga<void> {
    const { userId, action } = payload;

    try {
        userObservables.modules.followRequest.loading(userId);

        let data;
        let eventName;
        if (action === R.strings.button.followRequested) {
            data = yield call(apis.acceptFollowRequest, userId);
            eventName = "accepted";
        } else if (action === R.strings.button.followRejected) {
            data = yield call(apis.rejectFollowRequest, userId);
            eventName = "deleted";
        }

        yield call(MixpanelService.trackEvent, "users followed", {
            first_action_taken: eventName,
        });

        userObservables.modules.followRequest.success(userId, data);
    } catch (err) {
        userObservables.modules.followRequest.failed(userId);
    }
}
export default function*(): Saga<void> {
    yield takeLatest(actions.fetchFollowers, fetchFollowersWorker);
    yield takeEvery(actions.updateFollowingStatus, updateFollowingStatusWorker);
    yield takeEvery([actions.rejectFollow, actions.acceptFollow], updateFollowRequestWorker);
}
