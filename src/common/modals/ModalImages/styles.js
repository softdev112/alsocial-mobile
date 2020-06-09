import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "space-between",
    },
    headerContainer: {
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        position: "absolute",
        alignItems: "stretch",
        alignSelf: "stretch",
        backgroundColor: R.colors.blackQuarterOpacity,
    },
    footerContainer: {
        width: R.dimensions.screen.width,
        flex: 1,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
    },
    transparent: {
        backgroundColor: R.colors.blackHalfOpacity,
        borderBottomWidth: 0,
        borderColor: "transparent",
        opacity: 1,
    },
    text: {
        color: R.colors.white,
    },
});
