import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const initNotification = createAction(types.INIT_NOTIFICATION);

export const updateBrazeStatus = createAction(types.BRAZE_UPDATE_STATUS);
export const setPushNotificationData = createAction(types.BRAZE_PUSH_NOTIFICATION_DATA);
export const clearPushNotificationData = createAction(types.BRAZE_CLEAR_PUSH_NOTIFICATION_DATA);
export const updatePushNotificationStatus = createAction(
    types.BRAZE_UPDATE_PUSH_NOTIFICATION_STATUS,
);

export const enableBraze = createAction(types.BRAZE_ENABLE);
export const disableBraze = createAction(types.BRAZE_DISABLE);
export const checkPushNotification = createAction(types.BRAZE_CHECK_PUSH_NOTIFICATION);
