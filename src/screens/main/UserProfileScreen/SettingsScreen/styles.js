import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    flex: {
        flex: 1,
    },
    content: {
        marginTop: 24,
    },
    separator: {
        height: 1,
        backgroundColor: R.colors.borderGrey,
    },
    appVersion: {
        margin: R.dimensions.element.padding.normal,
    },
});
