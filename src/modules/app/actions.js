import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const initApp = createAction(types.APP_INIT);
export const authApp = createAction(types.APP_AUTH);
export const mainApp = createAction(types.APP_MAIN);
export const changeAppState = createAction(types.APP_CHANGE_STATE);
export const cancelTask = createAction(types.APP_CANCEL_TASK);
export const changedFullscreen = createAction(types.APP_FULLSCREEN);

export const setAppThemeMode = createAction(types.APP_THEME_MODE_SET);
export const setAppLightMode = createAction(types.APP_LIGHT_MODE);
