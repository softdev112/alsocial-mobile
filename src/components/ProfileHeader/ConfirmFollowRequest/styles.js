import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    container: {
        padding: R.dimensions.element.space.normal,
        position: "absolute",
        top: R.dimensions.element.space.normal,
        left: R.dimensions.screen.padding,
        right: R.dimensions.screen.padding,
        zIndex: 9999,
        alignItems: "center",
        borderRadius: 4,
    },
    actionContainer: {
        flexDirection: "row",
        marginTop: R.dimensions.element.padding.normal,
        marginHorizontal: R.dimensions.element.padding.normal,
    },
    button: {
        minWidth: 100,
    },
});
