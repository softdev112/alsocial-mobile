import { handleActions } from "redux-actions";
import * as actions from "./actions";
import { Root } from "utils/navigation";
import { signUpSuccess } from "../user/actions";

export const initialState = {
    currentStatus: null,
    isBackground: true,
    isFullscreen: false,
    isLightMode: false,
    mode: "light",
};

export default handleActions(
    {
        [actions.initApp]: state => ({
            ...state,
            isBackground: false,
            isFullscreen: false,
            currentStatus: null,
        }),
        [signUpSuccess]: state => ({
            ...state,
            mode: "light",
        }),
        [actions.setAppLightMode]: (state, { payload }) => ({
            ...state,
            isLightMode: payload,
        }),
        [actions.changeAppState]: (state, { payload }) => ({
            ...state,
            isBackground: payload,
        }),
        [actions.authApp]: state => ({
            ...state,
            currentStatus: Root.AuthStack,
        }),
        [actions.mainApp]: state => ({
            ...state,
            currentStatus: Root.MainStack,
        }),
        [actions.changedFullscreen]: (state, { payload }) => ({
            ...state,
            isFullscreen: payload,
        }),
        [actions.setAppThemeMode]: (state, { payload }) => ({
            ...state,
            mode: payload,
        }),
    },
    initialState,
);
