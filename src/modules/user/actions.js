import { createAction } from "redux-actions";

import * as types from "./actionTypes";

export const logIn = createAction(types.USER_LOG_IN);
export const logInSuccess = createAction(types.USER_LOG_IN_SUCCESS);
export const logInFailure = createAction(types.USER_LOG_IN_FAILURE);

export const validToken = createAction(types.USER_VALID_TOKEN);
export const invalidToken = createAction(types.USER_INVALID_TOKEN);

export const setSignUpEmail = createAction(types.USER_SIGN_UP_SET_EMAIL);
export const signUp = createAction(types.USER_SIGN_UP);
export const signUpSuccess = createAction(types.USER_SIGN_UP_SUCCESS);
export const signUpFailure = createAction(types.USER_SIGN_UP_FAILURE);

export const sendResetEmail = createAction(types.USER_SEND_RESET_EMAIL);

export const resetPassword = createAction(types.USER_RESET_PASSWORD);
export const resetPasswordSuccess = createAction(types.USER_RESET_PASSWORD_SUCCESS);
export const resetPasswordFailure = createAction(types.USER_RESET_PASSWORD_FAILURE);

export const updateProfile = createAction(types.USER_UPDATE_PROFILE);
export const updateInterests = createAction(types.USER_UPDATE_PROFILE_INTERESTS);
export const updateProfileSuccess = createAction(types.USER_UPDATE_PROFILE_SUCCESS);
export const updateProfileFailure = createAction(types.USER_UPDATE_PROFILE_FAILURE);

export const fetchUserDetails = createAction(types.USER_FETCH_DETAILS);
export const fetchUserSuggestions = createAction(types.USER_FETCH_SUGGESTIONS);
export const fetchUserDetailsSuccess = createAction(types.USER_FETCH_DETAILS_SUCCESS);
export const fetchUserDetailsFailure = createAction(types.USER_FETCH_DETAILS_FAILURE);

export const editPassword = createAction(types.USER_EDIT_PASSWORD);

export const deleteAccount = createAction(types.USER_DELETE_ACCOUNT);

export const logOut = createAction(types.USER_LOG_OUT);

export const fetchUserProfile = createAction(types.USER_FETCH_PROFILE);
export const fetchUserProfileSuccess = createAction(types.USER_FETCH_PROFILE_SUCCESS);

export const updateAccount = createAction(types.USER_UPDATE_ACCOUNT);
