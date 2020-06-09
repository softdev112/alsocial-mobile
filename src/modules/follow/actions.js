import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const fetchFollowers = createAction(types.FOLLOWERS_FETCH_FOLLOWERS);

export const fetchSelectedUserDetails = createAction("USER/SELECTED/FETCH_DETAILS");
export const fetchSelectedUserDetailsSuccess = createAction("USER/SELECTED/FETCH_DETAILS/SUCCESS");
export const fetchSelectedUserDetailsFailure = createAction("USER/SELECTED/FETCH_DETAILS/FAILURE");

export const updateFollowingStatus = createAction("USER/SELECTED/UPDATE_FOLLOWING_STATUS");

export const acceptFollow = createAction("USER/SELECTED/ACCEPT_FOLLOW");
export const rejectFollow = createAction("USER/SELECTED/REJECT_FOLLOW");
