import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    avatar: {
        marginTop: -R.dimensions.image.avatar.profile / 2,
        marginLeft: R.dimensions.element.padding.normal,
        alignSelf: "center",
    },
    content: {
        marginTop: R.dimensions.element.space.large * 2,
        marginBottom: R.dimensions.element.space.large,
        marginHorizontal: R.dimensions.element.padding.normal,
        flex: 1,
    },
    space: {
        height: R.dimensions.element.space.normal,
    },
    largeSpace: {
        height: R.dimensions.element.space.normal * 2,
    },
    rowSpace: {
        width: R.dimensions.element.space.normal,
    },
    rowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        height: R.dimensions.button.height.normal,
    },
    rowItemContainer: {
        flex: 1,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
    },
});
