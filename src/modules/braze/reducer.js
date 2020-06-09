import { handleActions } from "redux-actions";
import {
    clearPushNotificationData,
    setPushNotificationData,
    updatePushNotificationStatus,
    updateBrazeStatus,
} from "./actions";

export const initialState = {
    brazeStatus: true, // false = disabled, true = enabled
    pushNotificationStatus: false, // false = not granted, true = granted
    pushMessage: null,
};

export default handleActions(
    {
        [updateBrazeStatus]: (state, { payload }) => ({
            ...state,
            brazeStatus: payload,
        }),
        [updatePushNotificationStatus]: (state, { payload }) => ({
            ...state,
            pushNotificationStatus: payload,
        }),
        [setPushNotificationData]: (state, { payload }) => ({
            ...state,
            pushMessage: payload,
        }),
        [clearPushNotificationData]: (state, { payload }) => ({
            ...state,
            pushMessage: null,
        }),
    },
    initialState,
);
