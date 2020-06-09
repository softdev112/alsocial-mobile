import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: R.dimensions.element.padding.normal,
        paddingVertical: R.dimensions.element.padding.normal,
        alignItems: "center",
    },
    avatar: {
        alignSelf: "flex-start",
    },
    contentWrapper: {
        flex: 1,
        flexDirection: "column",
        marginLeft: R.dimensions.element.space.normal,
        justifyContent: "center",
    },
    content: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        lineHeight: 24,
    },
    contentText: {
        lineHeight: 24,
    },
});
