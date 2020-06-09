import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    flex: { flex: 1 },
    container: {
        flexGrow: 1,
    },
    content: {
        marginHorizontal: R.dimensions.element.padding.normal,
    },
    textInputContainer: {
        top: 50,
    },
    inputContainer: {
        marginHorizontal: R.dimensions.element.padding.normal,
        marginVertical: R.dimensions.element.space.normal,
    },
    input: {
        margin: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
    removeButtonContainer: {
        position: "absolute",
        right: 10,
        top: 10,
        backgroundColor: R.colors.blackHalfOpacity,
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    imageOverlay: {
        position: "absolute",
        right: 10,
        top: 10,
        backgroundColor: R.colors.blackHalfOpacity,
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: 16,
    },
});
