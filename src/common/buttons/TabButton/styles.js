import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    container: {
        ...R.palette.center,
        flexDirection: "column",
        alignSelf: "stretch",
    },
    button: {
        height: R.dimensions.button.height.normal,
        alignSelf: "stretch",
    },
    bottomLine: {
        height: R.dimensions.element.space.normal,
        alignSelf: "stretch",
    },
});
