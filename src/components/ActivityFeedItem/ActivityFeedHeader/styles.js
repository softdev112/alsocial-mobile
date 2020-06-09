import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        height: R.dimensions.header.height.normal,
        justifyContent: "center",
        width: "100%",
    },
    leftContainer: {
        height: "100%",
        flex: 1,
        flexDirection: "row",
    },
    time: {
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        paddingHorizontal: 8,
    },
    followButton: {
        justifyContent: "center",
    },
});
