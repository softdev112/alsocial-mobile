import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    flex: { flex: 1 },
    flexGrow: { flexGrow: 1, flex: 1 },
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
        margin: 0,
    },
    input: {
        margin: 0,
        paddingVertical: 0,
        paddingHorizontal: R.dimensions.element.padding.normal,
    },
    attachment: {
        marginTop: R.dimensions.element.space.normal,
        alignSelf: "stretch",
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
