import { NavigationActions, StackActions } from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    if (global.player) {
        global.player.stop();
    }
    _navigator?.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        }),
    );
}

function back() {
    if (global.player) {
        global.player.stop();
    }
    _navigator?.dispatch(NavigationActions.back());
}

function push(routeName, params) {
    if (global.player) {
        global.player.stop();
    }
    _navigator?.dispatch(
        StackActions.push({
            routeName,
            params,
        }),
    );
}

export default {
    navigate,
    setTopLevelNavigator,
    back,
    push,
};
