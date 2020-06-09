import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 0,
    },
    footerContainer: {
        paddingHorizontal: R.dimensions.element.padding.normal,
        justifyContent: "center",
        alignItems: "center",
        height: R.dimensions.footer.height,
    },
    flex: {
        flex: 1,
    },
});
