import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    container: {
        backgroundColor: "#424242",
        position: "absolute",
        width: R.dimensions.screen.width,
        zIndex: 1000,
        elevation: 2,
    },
    offlineText: {
        color: "white",
        padding: 10,
        textAlign: "center",
    },
});
