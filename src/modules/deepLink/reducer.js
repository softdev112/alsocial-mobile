import { handleActions, combineActions } from "redux-actions";

import * as actions from "./actions";
import { resetPasswordSuccess } from "../user/actions";
import { authApp, mainApp } from "../app/actions";
export const initialState = {
    resetToken: null,
    verifyToken: null,
    isInfluencer: false,
    isNewPassword: false,
    isFirst: true,
};

export default handleActions(
    {
        [actions.initDeepLink]: state => ({
            ...state,
            isNewPassword: false,
            isFirst: true,
        }),
        [actions.firstOpen]: state => ({
            ...state,
            isFirst: false,
        }),
        [actions.setResetToken]: (state, { payload }) => ({
            ...state,
            resetToken: payload,
            isNewPassword: false,
        }),
        [actions.setVerifyToken]: (state, { payload }) => ({
            ...state,
            verifyToken: payload,
        }),
        [actions.newPassword]: state => ({
            ...state,
            isNewPassword: true,
        }),
        [actions.influencer]: state => ({
            ...state,
            isInfluencer: true,
        }),
        [actions.checkDeepLinkMain]: state => ({
            ...state,
            isInfluencer: false,
        }),
        [combineActions(actions.clearResetToken, mainApp, resetPasswordSuccess)]: state => ({
            ...state,
            resetToken: null,
            isNewPassword: false,
            isFirst: false,
        }),
        [combineActions(actions.clearVerifyToken, authApp)]: state => ({
            ...state,
            verifyToken: null,
        }),
    },
    initialState,
);
