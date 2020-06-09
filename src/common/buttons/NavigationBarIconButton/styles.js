import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    container: {
        position: "absolute",
        alignItems: "center",
    },
    rightItem: {
        right: 4,
    },
    leftItem: {
        left: 4,
    },
    button: {
        width: R.dimensions.header.barIconSize,
        height: R.dimensions.header.barIconSize,
        ...R.palette.center,
    },
});
