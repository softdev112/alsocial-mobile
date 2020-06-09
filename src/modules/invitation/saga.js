import { takeLatest, select, put, call, fork } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import { Share, Platform, PermissionsAndroid } from "react-native";
import * as actions from "./actions";
import { getContacts, showShield, InviteType } from "utils/contacts";
import NavigationService from "service/Navigation";
import { getUsername } from "../user/selectors";
import { Main } from "utils/navigation";

const showShareShield = username => {
    const messageTitle = "ALL SOCIAL";
    const messageBody = `I'm on AllSocial now! Download the app and follow me! Username: ${username} ( https://allsocial.com/${username} )`;
    Share.share(
        {
            url: "https://allsocial.com",
            message: messageBody,
            title: messageTitle,
        },
        {
            // Android only:
            dialogTitle: "Invite your friends to AllSocial",
            // iOS only:
            excludedActivityTypes: [
                "com.apple.UIKit.activity.TypeAirDrop",
                "com.apple.UIKit.activity.TypeAddToReadingList",
                "com.apple.UIKit.activity.TypeAssignToContact",
                "com.apple.UIKit.activity.TypePostToFlickr",
                "com.apple.UIKit.activity.TypeOpenInIBooks",
                "com.apple.UIKit.activity.TypePrint",
                "com.apple.UIKit.activity.TypeSaveToCameraRoll",
                "com.apple.UIKit.activity.TypeMarkupAsPDF",
            ],
        },
    );
};

export function* initInvitationWorker({ payload: { showBottomSheet } }) {
    try {
        if (Platform.OS === "android") {
            const permission = yield PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: "Contacts",
                    message: "AllSocial would like to access your contacts",
                    buttonNegative: "Don't allow",
                    buttonPositive: "Okay",
                },
            );
            if (permission === "authorized" || permission === "granted") {
                yield put(actions.loadContacts({ permissionIsGranted: true, showBottomSheet }));
            } else {
                yield put(
                    actions.showInvitationShield({ permissionIsGranted: false, showBottomSheet }),
                );
            }
        } else {
            yield put(actions.loadContacts({ permissionIsGranted: true, showBottomSheet }));
        }
    } catch (e) {
        yield call(console.log, e);
    }
}

export function* loadContactsWorker({ payload: { permissionIsGranted, showBottomSheet } }) {
    try {
        const contacts = yield call(getContacts);
        yield put(actions.showInvitationShield({ permissionIsGranted, contacts, showBottomSheet }));
    } catch (e) {
        yield put(actions.showInvitationShield({ permissionIsGranted: false, showBottomSheet }));
    }
}

export function* showShieldWorker({
    payload: { permissionIsGranted, contacts, showBottomSheet },
}): Saga<Object> {
    const username = yield select(getUsername);
    const buttonIndex = yield call(showShield, permissionIsGranted, showBottomSheet);

    if (permissionIsGranted) {
        if (buttonIndex === 0) {
            yield NavigationService.navigate(Main.Invite, {
                contacts,
                username,
                type: InviteType.email,
            });
        }
        if (buttonIndex === 1) {
            yield NavigationService.navigate(Main.Invite, {
                contacts,
                username,
                type: InviteType.number,
            });
        }
        if (buttonIndex === 2) {
            yield call(showShareShield, username);
        }
    } else {
        if (buttonIndex === 0) {
            yield call(showShareShield, username);
        }
    }
}

export default function*() {
    yield takeLatest(actions.initInvitation, initInvitationWorker);
    yield takeLatest(actions.showInvitationShield, showShieldWorker);
    yield takeLatest(actions.loadContacts, loadContactsWorker);
}
