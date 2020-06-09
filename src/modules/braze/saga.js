// @flow
import { takeLatest, put, select, take, call, fork } from "redux-saga/effects";
import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from "react-native";
import type { Saga } from "redux-saga";
import { eventChannel } from "redux-saga";
import * as actions from "./actions";
import { brazeStatus, getPushMessage, pushNotificationStatus } from "./selectors";
import { getUser, getUserId, getUsername } from "../user/selectors";
import { appStatus, getBackgroundStatus } from "../app/selectors";
import { setBrazeOptions, enableBraze, disableBraze } from "utils/braze";
import NavigationService from "service/Navigation";
import { Main, Root } from "utils/navigation";
import R from "res/R";
import { changedFullscreen } from "../app/actions";
import { enterFullscreen, exitFullscreen } from "observable/video";
import { checkNotifications, RESULTS } from "react-native-permissions";

const EventEmitter =
    Platform.OS === "ios"
        ? new NativeEventEmitter(NativeModules.RNPushNotification)
        : DeviceEventEmitter;

const AppStateEventEmitter = new NativeEventEmitter(NativeModules.AppState);

const notificationChannel = eventName => {
    return eventChannel(emitter => {
        if (eventName === "appState") {
            const listener = AppStateEventEmitter.addListener("appStateDidChange", data => {
                if (data === "active") {
                    checkNotifications().then(({ status }) => {
                        emitter(status === RESULTS.GRANTED);
                    });
                }
            });
            return () => listener.remove();
        } else {
            const listener = EventEmitter.addListener(eventName, data => {
                emitter(data);
            });
            return () => {
                if (Platform.OS === "ios") {
                    listener.remove();
                } else {
                    EventEmitter.removeListener(eventName, listener);
                }
            };
        }
    });
};

export function* enableBrazeWorker(): Saga<void> {
    try {
        const status = yield select(appStatus);

        if (status === Root.MainStack) {
            const { status: notificationStatus } = yield call(checkNotifications);
            yield put(actions.updatePushNotificationStatus(notificationStatus === RESULTS.GRANTED));
            const pushStatus = yield select(pushNotificationStatus);
            if (pushStatus) {
                yield call(updateBrazeOptionsWorker);
            } else {
                yield call(disableBraze);
                yield put(actions.updateBrazeStatus(false));
                const userData = yield select(getUser);
                yield call(setBrazeOptions, userData);
            }
        }
    } catch (e) {
        yield call(console.log, e);
    }
}

export function* disableBrazeWorker(): Saga<void> {
    try {
        const status = yield select(appStatus);
        if (status === Root.AuthStack || status === Root.MainStack) {
            yield call(disableBraze);
            yield put(actions.updateBrazeStatus(false));
        }
    } catch (e) {
        yield call(console.log, e);
    }
}

export function* updateBrazeOptionsWorker(): Saga<void> {
    yield call(enableBraze);
    yield put(actions.updateBrazeStatus(true));

    const userData = yield select(getUser);
    yield call(setBrazeOptions, userData);
}

export function* handlePushNotificationWorker(): Saga<void> {
    const channel = yield call(notificationChannel, "notificationActionOpened");
    if (Platform.OS === "android") {
        yield call(NativeModules.RNPushNotification.setAvailablePushNotification);
    }
    while (true) {
        try {
            const { dataJSON } = yield take(channel);

            // AN-950 to show status bar again on push notification opened
            yield call(changedFullscreen, false);
            exitFullscreen();

            let messageData;
            if (Platform.OS === "ios") {
                messageData = dataJSON;
            } else {
                messageData = JSON.parse(dataJSON).extra;
            }

            yield put(actions.setPushNotificationData(messageData));

            const status = yield select(appStatus);
            const isBackground = yield select(getBackgroundStatus);
            if (status === Root.MainStack) {
                if (Platform.OS === "ios" || !isBackground) {
                    yield call(pushNotificationWorker);
                }
            }
        } catch (error) {
            console.log("handlePushNotificationWorker", error);
        }
    }
}

export function* pushNotificationWorker(): Saga<void> {
    try {
        const messageData = yield select(getPushMessage);
        if (messageData === null) {
            return;
        }

        const { activity, actor } = messageData;
        if (actor && (activity === null || activity === "null" || activity === "<null>")) {
            const user = Platform.OS === "ios" ? actor : JSON.parse(actor);
            const { id } = user;
            const userId = yield select(getUserId);
            if (userId === id) {
                yield call(NavigationService.navigate, "UserProfileTab");
            } else {
                yield call(NavigationService.push, Main.User, {
                    profileId: id,
                    actor: user,
                });
            }
        } else if (activity) {
            const lastActivity =
                activity.verb === "repost" || activity.verb === "post"
                    ? activity
                    : activity?.object
                    ? activity?.object
                    : activity;
            if (lastActivity) {
                const selectedActivity =
                    Platform.OS === "ios" ? lastActivity : JSON.parse(lastActivity);
                const username = yield select(getUsername);
                const isMention =
                    (selectedActivity?.verb === "post" &&
                        selectedActivity?.mentions &&
                        selectedActivity?.mentions[username]) ||
                    ((selectedActivity?.verb === "comment" ||
                        selectedActivity?.verb === "repost") &&
                        selectedActivity?.reaction &&
                        selectedActivity?.reaction?.data?.mentions &&
                        selectedActivity?.reaction?.data?.mentions[username]);

                yield call(NavigationService.push, Main.Comment, {
                    activity: selectedActivity,
                    feedType: R.strings.feedType.notification,
                    isMention: isMention,
                });
            }
        }

        yield put(actions.clearPushNotificationData());
    } catch (e) {
        console.log(e);
    }
}

export function* handlePushNotificationStatusWorker(): Saga<void> {
    const channel = yield call(notificationChannel, "appState");
    while (true) {
        try {
            const status = yield take(channel);

            yield put(actions.updatePushNotificationStatus(status));

            if (!status) {
                yield call(disableBraze);
                yield put(actions.updateBrazeStatus(false));
            } else if (yield select(appStatus) === Root.MainStack && (yield select(brazeStatus))) {
                yield call(updateBrazeOptionsWorker);
            }
        } catch (error) {
            console.log("handlePushNotificationStatusWorker", error);
        }
    }
}

export function* handleVideoEnterFullScreenWorker(): Saga<void> {
    if (Platform.OS !== "ios") {
        return;
    }

    const channel = yield call(notificationChannel, "VideoEnterFullScreen");
    while (true) {
        try {
            yield take(channel);
            yield call(changedFullscreen, true);
            enterFullscreen();
            yield console.log("enter fullscreen");
        } catch (error) {
            console.log("handleVideoEnterFullScreenWorker", error);
        }
    }
}

export function* handleVideoExitFullScreenWorker(): Saga<void> {
    if (Platform.OS !== "ios") {
        return;
    }

    const channel = yield call(notificationChannel, "VideoExitFullScreen");
    while (true) {
        try {
            yield take(channel);
            yield call(changedFullscreen, false);
            exitFullscreen();
            yield console.log("exit fullscreen");
        } catch (error) {
            console.log("handleVideoExitFullScreenWorker", error);
        }
    }
}

function* initNotificationWorker() {
    yield fork(handlePushNotificationStatusWorker);
    yield fork(handlePushNotificationWorker);
    yield fork(handleVideoEnterFullScreenWorker);
    yield fork(handleVideoExitFullScreenWorker);
}

export default function*(): Saga<void> {
    yield takeLatest(actions.initNotification, initNotificationWorker);
    yield takeLatest(actions.enableBraze, enableBrazeWorker);
    yield takeLatest(actions.disableBraze, disableBrazeWorker);
    yield takeLatest(actions.checkPushNotification, pushNotificationWorker);
}
