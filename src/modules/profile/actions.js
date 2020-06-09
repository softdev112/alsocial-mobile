import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const profileNavigation = createAction(types.PROFILE_NAVIGATION);
export const profileToFollowing = createAction(types.PROFILE_TO_FOLLOWING);
export const profileToFollowers = createAction(types.PROFILE_TO_FOLLOWERS);
export const profileToEdit = createAction(types.PROFILE_TO_EDIT);
export const profileToSettings = createAction(types.PROFILE_TO_SETTINGS);
export const profileToComments = createAction(types.PROFILE_TO_COMMENTS);
export const profileToLikes = createAction(types.PROFILE_TO_LIKES);
export const profileToOtherProfile = createAction(types.PROFILE_TO_OTHER_PROFILE);
export const profileToRepost = createAction(types.PROFILE_TO_REPOST);

export const profileCallRefresh = createAction(types.PROFILE_CALL_REFRESH);
export const profileCallLoadingMore = createAction(types.PROFILE_CALL_LOADING_MORE);

export const profileCallFinished = createAction(types.PROFILE_CALL_FINISHED);

export const profileNewFeeds = createAction(types.PROFILE_NEW_FEEDS);
