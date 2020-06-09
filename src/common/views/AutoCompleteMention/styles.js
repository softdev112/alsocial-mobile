import { StyleSheet, Platform } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    autocompleteContainerAndroid: {
        flex: 1,
        left: 0,
        position: "absolute",
        right: 0,
        zIndex: 1,
    },
    autocompleteContainerIOS: {
        flex: 1,
        left: 0,
        position: "absolute",
        right: 0,
        zIndex: 1,
    },
    inputContainerStyle: {
        borderWidth: 0,
        alignSelf: "stretch",
    },
    listContainer: {
        zIndex: 9999,
        marginVertical: 0,
        marginHorizontal: R.dimensions.element.space.normal,
    },
    listStyle: {
        borderWidth: 0,
        maxHeight: 120,
        minHeight: 60,
        margin: 0,
        position: "relative",
    },
    userContainer: {
        flex: 1,
        paddingHorizontal: R.dimensions.element.padding.normal,
        paddingVertical: R.dimensions.element.space.normal,
    },
});
