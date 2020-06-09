import { handleActions, combineActions } from "redux-actions";
import * as actions from "./actions";

export const initialState = {
    unreadNotification: 0,
};

export default handleActions(
    {
        [actions.loadGetStreamNotificationsSuccess]: (state, { payload }) => ({
            ...state,
            unreadNotification: payload ? payload.filter(item => item && !item.is_seen).length : 0,
        }),
        [combineActions(
            actions.loadGetStreamNotificationsRequest,
            actions.seenGetStreamNotifications,
        )]: (state, { payload }) => ({
            ...state,
            unreadNotification: 0,
        }),
    },
    initialState,
);
