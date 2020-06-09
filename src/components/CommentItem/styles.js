import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 7,
        paddingVertical: R.dimensions.element.padding.small,
    },
    avatarContainer: {
        alignSelf: "flex-start",
    },
    content: {
        paddingLeft: 15,
        paddingRight: 7,
        flex: 1,
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        fontSize: 14,
    },
    actionButton: {
        justifyContent: "center",
        alignItems: "center",
        padding: 6,
        width: 75,
    },
    like: {
        alignItems: "center",
        justifyContent: "flex-end",
    },
    delete: {
        backgroundColor: "#ed4855",
    },
    report: {
        backgroundColor: "#999999",
    },
    reply: {
        backgroundColor: "#999999",
    },
});
