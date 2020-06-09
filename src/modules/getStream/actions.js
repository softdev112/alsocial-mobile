import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const initGetStreamClient = createAction(types.GET_STREAM_INIT_CLIENT);
export const loadGetStreamNotificationsRequest = createAction(
    types.GET_STREAM_NOTIFICATIONS_REQUEST,
);
export const loadGetStreamNotificationsSuccess = createAction(
    types.GET_STREAM_NOTIFICATIONS_SUCCESS,
);
export const seenGetStreamNotifications = createAction(types.GET_STREAM_NOTIFICATION_SEEN);
export const loadGetStreamProfileFeedRequest = createAction(types.GET_STREAM_PROFILE_FEED_REQUEST);
