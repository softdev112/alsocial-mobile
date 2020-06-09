import { combineActions, handleActions } from "redux-actions";
import * as actions from "./actions";

export const initialState = {
    notifications: [],
    unreadNotification: 0,
};

export default handleActions(
    {
        [actions.fetchNotificationsSuccess]: (
            state,
            { payload: { newNotifications, unseen } },
        ) => ({
            notifications: newNotifications,
            unreadNotification: unseen,
        }),
        [actions.seenMarkNotifications]: state => ({
            ...state,
            unreadNotification: 0,
        }),
    },
    initialState,
);
