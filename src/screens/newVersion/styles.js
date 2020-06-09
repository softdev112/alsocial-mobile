import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: R.dimensions.screen.padding,
    },
    description: {
        marginBottom: R.dimensions.element.space.large,
        textAlign: "center",
    },
});
