import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    container: {
        width: "100%",
    },
    content: {
        padding: R.dimensions.element.space.normal,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    suggestionsContainer: {
        marginTop: R.dimensions.element.space.normal,
    },
    separator: {
        width: R.dimensions.element.space.normal,
    },
});
