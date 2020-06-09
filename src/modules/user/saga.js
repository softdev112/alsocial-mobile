// @flow
import { call, put, select, take, takeLatest } from "redux-saga/effects";
import { Alert, Platform } from "react-native";
import jwt_decode from "jwt-decode";
import type { Saga } from "redux-saga";
import { BranchEvent } from "react-native-branch";
import { enableBraze, disableBraze } from "../braze/actions";
import * as actions from "./actions";
import { getUserId, getUser } from "./selectors";
import { getResetToken } from "../deepLink/selectors";
import NavigationService from "service/Navigation";
import MixpanelService from "service/Mixpanel";
import * as newApis from "service/axios/user";
import userObservables from "observable/user";
import { initGetStreamClient } from "../getStream/actions";
import { Auth } from "utils/navigation";
import { checkName, checkUsername, checkEmail, checkPassword } from "utils/formValidator";
import { initialFollowing } from "res/limits";

export function* logInWorker({ payload }: Object): Saga<void> {
    const { credentials, password } = payload;

    let message = "";
    if (!credentials || credentials === "") {
        message = "Please enter your phone, email, or username.";
    }

    if (!password || password === "") {
        message = "Please enter your password.";
    }

    if (message !== "") {
        userObservables.modules.login.failed();
        yield call(Alert.alert, message);
        return;
    }

    try {
        userObservables.modules.login.loading();

        const responseLogIn = yield call(newApis.logInRequest, { credentials, password });
        if (responseLogIn) {
            const { error, appToken, streamToken } = responseLogIn;
            if (appToken) {
                const decoded = yield call(jwt_decode, appToken);
                yield put(
                    actions.logInSuccess({
                        token: appToken,
                        streamToken,
                        ...decoded,
                    }),
                );

                yield take([actions.fetchUserDetailsSuccess, actions.fetchUserDetailsFailure]);

                const user = yield select(getUser);
                MixpanelService.identify(user);

                yield put(disableBraze());
                yield put(enableBraze());
            } else if (error) {
                yield put(actions.logInFailure({ error }));
                yield call(
                    Alert.alert,
                    Platform.OS === "ios" ? error : null,
                    Platform.OS === "ios" ? null : error,
                );
                userObservables.modules.login.failed();
            }
        } else {
            userObservables.modules.login.failed();
        }
    } catch (error) {
        yield put(actions.logInFailure(error));
        userObservables.modules.login.failed();
    }
}

export function* setSignUpEmailWorker({ payload }: Object): Saga<void> {
    try {
        let emailError = checkEmail(payload);
        if (emailError) return yield call(Alert.alert, emailError);

        userObservables.modules.signUpEmail.loading();

        const { exists } = yield call(newApis.checkEmailRequest, payload);

        if (exists) {
            yield call(Alert.alert, "Email already in use.");
            userObservables.modules.signUpEmail.failed();
        } else {
            userObservables.modules.signUpEmail.success();
            NavigationService.navigate(Auth.SignUpSettings, { email: payload });
        }
    } catch (e) {
        console.error(e);
        userObservables.modules.signUpEmail.failed();
    }
}

export function* signUpWorker({ payload }: Object): Saga<void> {
    try {
        userObservables.modules.signUp.loading();
        const { error, appToken, streamToken } = yield call(newApis.signUpRequest, {
            ...payload,
        });
        if (error) {
            yield call(Alert.alert, error);
            userObservables.modules.signUp.failed();
            return;
        }
        const { password, ...rest } = payload;
        const decoded = yield call(jwt_decode, appToken);
        yield put(
            actions.signUpSuccess({
                token: appToken,
                streamToken,
                ...decoded,
                ...rest,
            }),
        );

        yield take([actions.fetchUserDetailsSuccess, actions.fetchUserDetailsFailure]);

        const user = yield select(getUser);
        MixpanelService.identify(user);
        MixpanelService.trackEvent("sign ups");
        new BranchEvent(BranchEvent.CompleteRegistration).logEvent();
        userObservables.modules.signUp.success();
    } catch (err) {
        yield put(actions.signUpFailure(err));
        userObservables.modules.signUp.failed();
    }
}

export function* sendResetEmailWorker({ payload }: Object): Saga<void> {
    const { email } = payload;
    try {
        let emailError = checkEmail(email);

        if (emailError !== "") {
            userObservables.modules.resetPassword.failed();
            yield call(Alert.alert, emailError);
            return;
        }

        userObservables.modules.resetPassword.loading();

        const { response, error } = yield call(newApis.resetEmailRequest, payload);
        // const { response, error } = yield call([responseReset, responseReset.json]);

        if (response) {
            yield call(Alert.alert, response);

            userObservables.modules.resetPassword.success();
        } else {
            if (error) {
                if (typeof error === "string") {
                    yield call(Alert.alert, error);
                } else if (error?.response?.data?.error) {
                    yield call(Alert.alert, error?.response?.data?.error);
                }
            }

            userObservables.modules.resetPassword.failed();
        }
    } catch (error) {
        // yield put(actions.sendResetEmailFailure(error));
        userObservables.modules.resetPassword.failed();
    }
}

export function* resetPasswordWorker({ payload }: Object): Saga<void> {
    try {
        const token = yield select(getResetToken);
        const { password, confirmPassword } = payload;
        let passwordError = checkPassword(password, confirmPassword);
        if (passwordError) {
            return yield call(Alert.alert, passwordError);
        }

        userObservables.modules.newPassword.loading();

        const { response, error } = yield call(newApis.updatePasswordRequest, payload, token);

        if (response) {
            userObservables.modules.newPassword.success();
            yield put(actions.resetPasswordSuccess());
            yield call(NavigationService.navigate, "LogInScreen");
            yield call(Alert.alert, response);
            NavigationService.navigate(Auth.Auth);
        } else if (error) {
            yield put(actions.resetPasswordFailure(error));
            yield call(Alert.alert, error);
            userObservables.modules.newPassword.failed();
        }
    } catch (error) {
        yield put(actions.resetPasswordFailure(error));
        userObservables.modules.newPassword.failed();
    }
}

export function* editPasswordWorker({ payload }: Object): Saga<void> {
    try {
        const { password, newPassword, confirmNewPassword } = payload;
        let passwordError = checkPassword(newPassword, confirmNewPassword);

        if (passwordError) {
            return yield call(Alert.alert, passwordError);
        }

        userObservables.modules.changePassword.loading();

        const userId = yield select(getUserId);
        const { status, error, user } = yield newApis.editPasswordRequest({
            current: password,
            update: newPassword,
            userId,
        });

        if (user) {
            userObservables.modules.changePassword.success();
            yield put(actions.logOut());
            yield call(Alert.alert, "", status);
        } else if (error) {
            userObservables.modules.changePassword.failed();
            yield call(Alert.alert, error);
        }

        // yield put(disableLoaderScreen());
    } catch (error) {
        userObservables.modules.changePassword.failed();
    }
}

export function* fetchUserDetailsWorker({ payload }: Object): Saga<void> {
    const { profileId, callback } = payload;
    const userId = yield select(getUserId);
    try {
        const { data, exception, detail, followers_count, following_count } = yield call(
            newApis.fetchDetailsRequest,
            profileId,
        );
        const { token, streamToken, ...restData } = data;

        if (exception) {
            yield put(actions.fetchUserDetailsFailure(detail));
            if (callback) {
                callback({ error: detail });
            }
        } else if (data) {
            const results = {
                ...restData,
                followers_count: Math.max(followers_count - 1, 0),
                following_count: Math.max(following_count - 1, 0),
            };
            if (userId === profileId) {
                yield put(actions.fetchUserDetailsSuccess(results));
            }
            if (callback) {
                callback({ results });
            }
        }
    } catch (err) {
        yield put(actions.fetchUserDetailsFailure(err));
        if (callback) {
            callback({ error: err });
        }
    }
}

export function* fetchUserProfileWorker({ payload }: Object): Saga<void> {
    const { profileId, callback } = payload;
    if (!callback) {
        return;
    }

    try {
        const {
            exception,
            detail,
            data,
            followers_count,
            following_count,
            following,
            follower,
        } = yield call(newApis.userProfileRequest, profileId);

        if (exception) {
            if (callback) {
                callback({ error: detail });
            }
        } else if (data) {
            const results = {
                ...data,
                followers_count: Math.max(followers_count - 1, 0),
                following_count: Math.max(following_count - 1, 0),
                following,
                follower,
            };

            const userId = yield select(getUserId);
            if (userId === profileId) {
                yield put(actions.fetchUserProfileSuccess(results));
            } else {
                userObservables.modules.following.success(profileId, { following, follower });
            }
            if (callback) {
                callback({ results });
            }
        } else {
            callback({ error: "Failed" });
        }
    } catch (err) {
        callback({ error: err ? err : "Unknown Error!!!" });
    }
}

export function* fetchUserSuggestionsWorker({ payload }: Object): Saga<void> {
    const { page, per_page, callback } = payload;
    if (!callback) {
        return;
    }
    try {
        callback({ isLoading: true });
        const response = yield newApis.fetchUserSuggestionsRequest(page, per_page);
        if (Array.isArray(response)) {
            callback({ suggestions: response, page, isLoading: false });
        } else {
            callback({ isLoading: false });
        }
    } catch (err) {
        callback({ error: err, isLoading: false });
    }
}

function* saveProfile(payload: Object, modules, mixpanelEvent, isBack = false) {
    try {
        modules.loading();
        const { newCover, newAvatar, ...rest } = payload;
        let profile = rest;
        if (newCover) {
            const { imageUri, contentType } = newCover;
            const coverImage = yield call(uploadImage, imageUri, contentType);
            profile = { ...profile, coverImage };
            new BranchEvent("Update Cover Image").logEvent();
        }
        if (newAvatar) {
            const { imageUri, contentType } = newAvatar;
            const profileImage = yield call(uploadImage, imageUri, contentType);
            profile = { ...profile, profileImage };
            new BranchEvent("Update Profile Image").logEvent();
        }
        // only update differences from existing user data
        if (isBack) {
            const user = yield select(getUser);
            for (let key in profile) {
                if (profile[key] === user[key]) {
                    delete profile[key];
                }
            }
        }
        const responseUpdate = yield newApis.updateProfileRequest(profile);
        const { streamProfile, error } = responseUpdate;
        if (error) {
            yield put(actions.updateProfileFailure(error));
            yield call(Alert.alert, "", error);
            modules.failed();
        } else {
            if (streamProfile) {
                yield put(actions.updateProfileSuccess({ ...profile, ...streamProfile }));
            }
            modules.success();
        }
    } catch (err) {
        yield put(actions.updateProfileFailure(err));
        modules.failed();
    }
}

export function* updateProfileWorker({ payload }: Object): Saga<void> {
    const { name, gender } = payload;
    let nameError = checkName(name);

    if (nameError) {
        return yield call(Alert.alert, nameError);
    }
    let profile = gender && !!gender.length ? payload : { ...payload, gender: "not specified" };
    try {
        yield call(
            saveProfile,
            profile,
            userObservables.modules.updateProfile,
            "Profile Edit",
            true,
        );
    } catch (err) {
        yield call(console.log, err);
    }
}

export function* updateAccountWorker({ payload }: Object): Saga<void> {
    const { username, email, phone } = payload;
    let usernameError = checkUsername(username);
    let emailError = checkEmail(email);

    if (usernameError || emailError) {
        return yield call(Alert.alert, "", emailError || usernameError);
    }

    try {
        const user = yield select(getUser);
        yield call(
            saveProfile,
            payload,
            userObservables.modules.updateAccount,
            "Settings Edit",
            true,
        );
    } catch (err) {
        yield put(console.log, err);
    }
}

export function* updateInterestsWorker({ payload }: Object): Saga<void> {
    const { interests } = payload;
    try {
        const recoms = yield call(newApis.fetchRecommendations, {
            interest: interests.join(),
            limit: initialFollowing,
        });

        yield call(
            saveProfile,
            {
                follow: Array.isArray(recoms) ? recoms.map(r => r._id) : [],
                interests,
            },
            userObservables.modules.interests,
            "Update Interests",
            false,
        );

        interests.forEach(i => {
            MixpanelService.trackEvent("interests", { first_action_taken: i.toLowerCase() });
        });
    } catch (err) {
        yield call(console.log, err);
    }
}

export function* deleteProfileWorker(): Saga<void> {
    try {
        userObservables.modules.deleteAccount.loading();
        const { error } = yield call(newApis.deleteAccountRequest);

        if (error) {
            Alert.alert(error);
            userObservables.modules.deleteAccount.failed();
        } else {
            // userObservables.modules.deleteAccount.success();
            yield put(actions.logOut());
        }
    } catch (err) {
        console.log(err);
        userObservables.modules.deleteAccount.failed();
    }
}

export function* logInSuccessWorker(): Saga<void> {
    yield put(initGetStreamClient());

    const userId = yield select(getUserId);
    yield put(actions.fetchUserDetails({ profileId: userId }));

    yield take([actions.fetchUserDetailsSuccess, actions.fetchUserDetailsFailure]);

    userObservables.modules.login.success();
}

function* uploadImage(imageUri, contentType): Saga<void> {
    if (!Boolean(imageUri)) return false;
    try {
        const formData: FormData = new FormData();
        const filename = imageUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image";

        formData.append("file", {
            uri: imageUri,
            name: filename,
            type: Platform.OS === "android" ? contentType : type,
        });

        const { file } = yield newApis.uploadImageRequest(formData);

        if (file) {
            return file;
        } else {
            return "";
        }
    } catch (err) {
        console.log(err);
        return "";
    }
}

export default function*(): Saga<void> {
    yield takeLatest(actions.logIn, logInWorker);
    yield takeLatest(
        [actions.logInSuccess, actions.signUpSuccess, actions.validToken],
        logInSuccessWorker,
    );
    yield takeLatest(actions.setSignUpEmail, setSignUpEmailWorker);
    yield takeLatest(actions.signUp, signUpWorker);
    yield takeLatest(actions.sendResetEmail, sendResetEmailWorker);
    yield takeLatest(actions.resetPassword, resetPasswordWorker);
    yield takeLatest(actions.editPassword, editPasswordWorker);
    yield takeLatest(actions.updateProfile, updateProfileWorker);
    yield takeLatest(actions.updateInterests, updateInterestsWorker);
    yield takeLatest(actions.deleteAccount, deleteProfileWorker);
    yield takeLatest(actions.fetchUserDetails, fetchUserDetailsWorker);
    yield takeLatest(actions.fetchUserSuggestions, fetchUserSuggestionsWorker);
    yield takeLatest(actions.fetchUserProfile, fetchUserProfileWorker);
    yield takeLatest(actions.updateAccount, updateAccountWorker);
}
