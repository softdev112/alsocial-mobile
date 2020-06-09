import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingVertical: R.dimensions.screen.padding,
        paddingHorizontal: R.dimensions.element.padding.normal,
    },
    space: {
        height: R.dimensions.element.space.normal,
    },
    largeSpace: {
        height: R.dimensions.element.space.normal * 2,
    },
    privateContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15,
    },
});
