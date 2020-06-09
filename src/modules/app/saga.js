// @flow
import {
    all,
    fork,
    call,
    put,
    take,
    takeLatest,
    takeEvery,
    race,
    select,
    cancel,
} from "redux-saga/effects";
import DeviceInfo from "react-native-device-info";
import type { Saga } from "redux-saga";
import * as actions from "./actions";
import { validToken, logOut, invalidToken } from "../user/actions";
import NavigationService from "service/Navigation";
import MixpanelService from "service/Mixpanel";
import { initNotification, checkPushNotification } from "../braze/actions";
import { initDeepLink, checkDeepLinkMain, checkDeepLinkAuth } from "../deepLink/actions";
import { isInfluencer } from "../deepLink/selectors";
import { fetchNotifications } from "../notification/actions";
import { getUser, getUserInterests, getUserToken } from "../user/selectors";
import { Root } from "utils/navigation";
import SplashScreen from "react-native-splash-screen";
import * as apis from "service/axios/versionNumber";
import { changeUser } from "react-native-appboy-sdk";

export function* appInitWorker(): Saga<void> {
    yield put(initNotification());
    yield put(initDeepLink());

    yield call(MixpanelService.init);

    yield fork(loginFlow);

    const { token, exp } = yield select(getUser);

    let isLoggedIn = false;
    if (token && exp) {
        const timestamp = new Date() / 1000;
        if (timestamp < exp) {
            isLoggedIn = true;
        }
    }
    if (isLoggedIn) {
        const user = yield select(getUser);
        MixpanelService.identify(user);

        yield put(validToken());
    } else {
        yield put(invalidToken());
    }
    yield call(SplashScreen.hide);
}

function* loginFlow(): Saga<void> {
    while (true) {
        const { success } = yield race({
            success: take(validToken),
            failed: take([logOut, invalidToken]),
        });
        if (success) {
            yield call(loginSuccessWorker);
        } else {
            yield call(logoutWorker);
        }
    }
}

export function* loginSuccessWorker(): Saga<void> {
    try {
        const userToken = yield select(getUserToken);
        if (userToken) {
            const interests = yield select(getUserInterests);
            if (Array.isArray(interests) && interests.length) {
                yield call(NavigationService.navigate, Root.MainStack);
                yield put(checkPushNotification());
                yield put(fetchNotifications({ markSeen: false }));
            } else {
                yield call(NavigationService.navigate, Root.Interests);
            }
            yield call(changeAppStateWorker, false);
        } else {
            yield call(logoutWorker);
        }
    } catch (e) {}
}

export function* logoutWorker(): Saga<void> {
    try {
        yield call(NavigationService.navigate, Root.AuthStack);
        yield call(changeUser, null); // change user per docs to stop notifications
        yield call(changeAppStateWorker, false);
    } catch (e) {}
}

export function* initMainWorker(): Saga<void> {
    const influencer = yield select(isInfluencer);
    if (influencer) {
        yield put(checkDeepLinkMain());
    }
}

export function* initAuthWorker(): Saga<void> {
    yield put(checkDeepLinkAuth());
}

export function* changeAppStateWorker({ payload }: Object): Saga<void> {
    if (!payload) {
        try {
            const versionNumber = yield call(apis.versionNumberRequest);
            const buildNumber = DeviceInfo.getBuildNumber();
            if (versionNumber.build > buildNumber) {
                yield call(NavigationService.navigate, Root.NewVersion);
            }
        } catch (e) {}
    }
}

export function* cancelTaskWorker({ payload: { task } }): Saga<void> {
    if (task) {
        yield cancel(task);
    }
}

export default function*(): Saga<void> {
    yield takeLatest(actions.initApp, appInitWorker);
    yield takeLatest(actions.mainApp, initMainWorker);
    yield takeLatest(actions.authApp, initAuthWorker);
    yield takeLatest(actions.changeAppState, changeAppStateWorker);
    yield takeEvery(actions.cancelTask, cancelTaskWorker);
}
