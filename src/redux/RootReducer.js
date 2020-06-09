import { combineReducers } from "redux";

import appState from "modules/app/reducer";
import userState from "modules/user/reducer";
import getStreamState from "modules/getStream/reducer";
import brazeState from "modules/braze/reducer";
import deepLinkState from "modules/deepLink/reducer";
import regionState from "modules/region/reducer";
import profileState from "modules/profile/reducer";
import notificationState from "modules/notification/reducer";
import { USER_LOG_OUT } from "modules/user/actionTypes";

const appReducer = combineReducers({
    appState,
    userState,
    getStreamState,
    brazeState,
    deepLinkState,
    regionState,
    profileState,
    notificationState,
});

export default (state, action) => {
    if (action.type === USER_LOG_OUT) {
        state = {
            appState: state.appState,
        };
    }

    return appReducer(state, action);
};
