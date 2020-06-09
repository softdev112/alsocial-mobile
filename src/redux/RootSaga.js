import { all } from "redux-saga/effects";

import appSaga from "modules/app/saga";
import userSaga from "modules/user/saga";
import getStreamSaga from "modules/getStream/saga";
import activitySaga from "modules/activity/saga";
import followSaga from "modules/follow/saga";
import invitationSaga from "modules/invitation/saga";
import brazeSaga from "modules/braze/saga";
import deepLinkSaga from "modules/deepLink/saga";
import feedSaga from "modules/feed/saga";
import gifsSaga from "modules/gifs/saga";
import regionSaga from "modules/region/saga";
import profileSaga from "modules/profile/saga";
import likesSaga from "modules/likes/saga";
import notificationSaga from "modules/notification/saga";
import timelineSaga from "modules/timeline/saga";
import exploreSaga from "modules/explore/saga";

export default function* root() {
    yield all([
        appSaga(),
        userSaga(),
        getStreamSaga(),
        activitySaga(),
        followSaga(),
        invitationSaga(),
        brazeSaga(),
        deepLinkSaga(),
        feedSaga(),
        gifsSaga(),
        profileSaga(),
        regionSaga(),
        likesSaga(),
        notificationSaga(),
        timelineSaga(),
        exploreSaga(),
    ]);
}
