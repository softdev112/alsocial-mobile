import { Dimensions, Platform } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import ExtraDimensions from "react-native-extra-dimensions-android";
import { getStatusBarHeight } from "react-native-status-bar-height";

// const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
// const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;
// const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 64;
// const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const dimensions = {
    screen: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        extraHeight:
            Platform.OS === "android"
                ? ExtraDimensions.getRealWindowHeight()
                : Dimensions.get("window").height,
        bottomSpace:
            Platform.OS === "android"
                ? ExtraDimensions.isSoftMenuBarEnabled()
                    ? ExtraDimensions.getSoftMenuBarHeight() - ExtraDimensions.getSmartBarHeight()
                    : 0
                : getBottomSpace(),
        padding: 24,
        navigationBarHeight: 50,
        softMenuBarHeight: Platform.OS === "android" ? ExtraDimensions.getSoftMenuBarHeight() : 0,
        statusBarHeight: getStatusBarHeight(),
        smartBarHeight: Platform.OS === "android" ? ExtraDimensions.getSmartBarHeight() : 0,
    },
    searchBar: {
        height: 50,
        inputHeight: 34,
    },
    header: {
        height: {
            normal: 50,
        },
        titleSize: 18,
        barIconSize: 44,
    },
    footer: {
        height: 50,
    },
    element: {
        space: {
            normal: 10,
            small: 6,
            large: 16,
        },
        padding: {
            normal: 16,
            small: 12,
            large: 24,
        },
        border: {
            normal: 1,
        },
    },
    suggestion: {
        width: 115,
        height: 150,
        avatar: 60,
        buttonHeight: 28,
        textSize: 12,
        buttonText: 12,
    },
    button: {
        height: {
            normal: 42,
            small: 32,
            navigationBar: 28,
        },
        padding: {
            normal: 16,
            small: 8,
        },
        textSize: {
            normal: 16,
            small: 12,
            large: 18,
        },
        reaction: {
            invisiblePadding: 12,
            normal: 32,
            small: 28,
        },
        borderWidth: 1,
    },
    text: {
        normal: 16,
        small: 14,
        large: 18,
        xLarge: 40,
        username: {
            normal: 16,
            large: 20,
        },
    },
    textInput: {
        padding: {
            normal: 8,
            small: 4,
            large: 12,
        },
    },
    image: {
        cover: {
            height: 180,
        },
        avatar: {
            normal: 34,
            large: 40,
            small: 30,
            profile: 120,
        },
        notification: {
            normal: 50,
        },
    },
};

export default dimensions;
