import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: R.colors.black,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    webviewContainer: {
        flex: 1,
        alignSelf: "center",
        backgroundColor: R.colors.black,
    },
    closeButtonContainer: {
        position: "absolute",
        left: 8,
        top: 8,
        width: 40,
        height: 40,
        backgroundColor: R.colors.whiteQuarterOpacity,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 8,
    },
});
