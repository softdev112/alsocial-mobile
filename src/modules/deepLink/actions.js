import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const initDeepLink = createAction(types.DEEP_LINK_INIT);
export const setResetToken = createAction(types.DEEP_LINK_RESET_TOKEN);
export const clearResetToken = createAction(types.DEEP_LINK_CLEAR_RESET_TOKEN);
export const setVerifyToken = createAction(types.DEEP_LINK_VERIFY_TOKEN);
export const clearVerifyToken = createAction(types.DEEP_LINK_CLEAR_VERIFY_TOKEN);

export const checkDeepLinkMain = createAction(types.DEEP_LINK_CHECK_MAIN);
export const checkDeepLinkAuth = createAction(types.DEEP_LINK_CHECK_AUTH);
export const newPassword = createAction(types.DEEP_LINK_NEW_PASSWORD);

export const influencer = createAction(types.DEEP_LINK_INFLUENCER);

export const firstOpen = createAction(types.DEEP_LINK_FIRST_OPEN);
