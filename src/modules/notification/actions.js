import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const fetchNotifications = createAction(types.NOTIFICATIONS_FETCH);
export const fetchNotificationsSuccess = createAction(types.NOTIFICATIONS_FETCH_SUCCESS);
export const seenMarkNotifications = createAction(types.NOTIFICATIONS_MARK_SEEN);
