// @flow
import { Alert } from "react-native";

import type { Saga } from "redux-saga";
import { takeLatest, call, take, put, select, race } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import branch from "react-native-branch";

import * as actions from "./actions";

import { appStatus } from "../app/selectors";
import { getResetToken, getVerifyToken, isNewPassword, isFirst } from "./selectors";

import * as apis from "service/axios/user";
import * as feedApi from "service/axios/feed";

import NavigationService from "service/Navigation";
import { Auth, Main } from "utils/navigation";
import { Root } from "../../utils/navigation";
import { getUser } from "../user/selectors";
import { mainApp, authApp } from "../app/actions";

const deepLinkChannel = () => {
    return eventChannel(emitter => {
        branch.skipCachedEvents();
        const unsubscribeFromBranch = branch.subscribe(({ error, params }) => {
            emitter({ error, params });
        });
        return () => {
            if (unsubscribeFromBranch) {
                unsubscribeFromBranch();
            }
        };
    });
};

export function* initDeepLinkWorker(): Saga<void> {
    const channel = yield call(deepLinkChannel);
    while (true) {
        try {
            const { error, params } = yield take(channel);
            if (error || !params) {
                continue;
            }

            let { token: resetToken, verifyToken } = params;

            const link = params["+non_branch_link"];

            if (link) {
                if (link.includes("token=")) {
                    resetToken = link.split("token=")[1];
                }
                if (link.includes("verifyToken=")) {
                    verifyToken = link.split("verifyToken=")[1];
                }
                if (resetToken || verifyToken) {
                    yield call(handleDeepLinkWorker, { resetToken, verifyToken });
                }
            } else {
                yield call(handleDeepLinkWorker, { resetToken, verifyToken });
            }
        } catch (error) {
            console.log("initDeepLinkWorker", error);
        }
    }
}

export function* handleDeepLinkWorker({ resetToken, verifyToken }: Object): Saga<void> {
    if (resetToken) {
        yield put(actions.setResetToken(resetToken));
    } else if (verifyToken) {
        yield put(actions.setVerifyToken(verifyToken));
    }

    const status = yield select(appStatus);
    if (status) {
        if (status === Root.AuthStack && resetToken) {
            yield call(resetPasswordWorker);
        } else if (status === Root.MainStack) {
            yield call(verificationWorker);
        } else {
            yield put(actions.influencer());
        }
    } else {
        const { main, auth } = yield race({
            main: take(mainApp),
            auth: take(authApp),
        });

        if (auth && resetToken) {
            yield call(resetPasswordWorker);
        } else if (main) {
            yield call(verificationWorker);
        } else {
            yield put(actions.influencer());
        }
    }
}

/// Verification and Deep Link Params Redirect

export function* verificationWorker(): Saga<void> {
    const verifyToken = yield select(getVerifyToken);
    if (verifyToken) {
        const { error } = yield call(apis.verifyEmail, { verifyToken });
        let message = "Thanks! Your email was verified.";
        if (error) {
            message = error;
        }

        yield call(Alert.alert, "", message);

        yield put(actions.clearVerifyToken());
    }

    // const user = yield select(getUser);

    // const params = yield call(branch.getLatestReferringParams, true);

    // if (params.activity_id) {
    //     const { activity_id, actor_id } = params;

    //     const { results } = yield call(feedApi.fetchSingleActivity, "user", actor_id, activity_id);

    //     return NavigationService.push(Main.Comment, {
    //         activity: results[0],
    //         feedType: "Profile",
    //         isMention: false,
    //     });
    // }

    // if (params.$canonical_url) {
    //     const { actor_id } = params;
    //     const username = params.$canonical_url.split("https://allsocial.com/")[1];

    //     if (actor_id && username) {
    //         if (user._id === actor_id) {
    //             return NavigationService.navigate(Main.Profile, {
    //                 profileId: actor_id,
    //                 username,
    //             });
    //         } else {
    //             return NavigationService.push(Main.User, {
    //                 profileId: actor_id,
    //                 username,
    //             });
    //         }
    //     }
    // }

    // if (params.path && params.path !== "/") {
    //     const path = params.path.slice(1);

    //     const userId = yield call(apis.getUserId, path);

    //     if (userId && !userId.includes("<")) {
    //         return NavigationService.push(Main.User, {
    //             profileId: userId,
    //             username: path,
    //         });
    //     }
    // }
}

/// Reset Password

export function* resetPasswordWorker(): Saga<void> {
    const resetToken = yield select(getResetToken);
    const newPassword = yield select(isNewPassword);
    if (!newPassword) {
        if (resetToken) {
            yield put(actions.newPassword());
            yield call(NavigationService.navigate, Auth.NewPassword);
        } else {
            const first = yield select(isFirst);
            if (first) {
                const { token } = yield call(branch.getLatestReferringParams, true);
                if (token) {
                    yield call(handleDeepLinkWorker, { resetToken: token });
                }
            }
        }
    }
    yield put(actions.firstOpen());
}

export default function*(): Saga<void> {
    yield takeLatest(actions.initDeepLink, initDeepLinkWorker);
    yield takeLatest(actions.checkDeepLinkAuth, resetPasswordWorker);
    yield takeLatest(actions.checkDeepLinkMain, verificationWorker);
}
