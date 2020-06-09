import { StyleSheet } from "react-native";

import R from "res/R";

export default StyleSheet.create({
    container: {
        backgroundColor: R.colors.red,
        position: "absolute",
        right: -6,
        top: -6,
        padding: 2,
        minWidth: 16.5,
        height: 16.5,
        borderRadius: 8.25,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    text: {
        color: "white",
        fontSize: 10,
        lineHeight: 12,
    },
});
