import { StyleSheet, View } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        height: R.dimensions.button.height.normal,
    },
});
