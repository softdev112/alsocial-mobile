import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    flex: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: "column",
    },
    tabContainer: {
        flexDirection: "row",
        alignSelf: "stretch",
    },
    tabButton: {
        flex: 1,
    },
    blockContainer: {
        minHeight: 150,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: R.dimensions.screen.padding,
    },
});
