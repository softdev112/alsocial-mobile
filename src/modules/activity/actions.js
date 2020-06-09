import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const loadComments = createAction(types.ACTIVITY_LOAD_COMMENTS);

export const createActivity = createAction(types.ACTIVITY_CREATE);
export const deleteActivity = createAction(types.ACTIVITY_DELETE);
export const updateActivity = createAction(types.ACTIVITY_UPDATE);
export const reportActivity = createAction(types.ACTIVITY_REPORT);
export const reportComment = createAction(types.COMMENT_REPORT);

export const toggleLikeActivity = createAction(types.ACTIVITY_TOGGLE_LIKE);
export const toggleLikeComment = createAction(types.ACTIVITY_TOGGLE_LIKE_COMMENT);
export const deleteComment = createAction(types.ACTIVITY_DELETE_COMMENT);
export const addComment = createAction(types.ACTIVITY_ADD_COMMENT);
export const updateComment = createAction(types.ACTIVITY_UPDATE_COMMENT);

export const repostActivity = createAction(types.ACTIVITY_REPOST);
export const deleteRepostActivity = createAction(types.ACTIVITY_DELETE_REPOST);
export const updateRepostActivity = createAction(types.ACTIVITY_UPDATE_REPOST);
