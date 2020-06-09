import { StyleSheet, Platform } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 1,
    },
    inputContainerStyle: {
        borderWidth: 0,
        alignSelf: "stretch",
        flexDirection: "column-reverse",
    },
    listStyle: {
        borderTopWidth: 1,
        maxHeight: 120,
        minHeight: 60,
        marginHorizontal: R.dimensions.element.space.normal,
        bottom: 0,
    },
    textInputContainer: {
        flex: 1,
    },
    textInput: {
        paddingHorizontal: 8,
        paddingVertical: Platform.OS === "ios" ? 6 : 2,
    },
    userContainer: {
        flex: 1,
        paddingHorizontal: R.dimensions.element.padding.normal,
        paddingVertical: R.dimensions.element.space.small,
    },
});
