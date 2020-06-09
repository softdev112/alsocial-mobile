import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    header: {
        width: "100%",
        height: R.dimensions.screen.navigationBarHeight,
    },
});
