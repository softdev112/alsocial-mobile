import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    flex: {
        flex: 1,
    },
    search: {
        minWidth: 220,
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    footerContainer: {
        paddingHorizontal: R.dimensions.element.padding.normal,
        justifyContent: "center",
        alignItems: "center",
        height: R.dimensions.footer.height,
    },
    contentContainerStyle: {
        paddingBottom: 20,
    },
    columnWrapperStyle: {
        marginVertical: 5,
        alignItems: "center",
    },
    image: {
        marginHorizontal: 5,
    },
});
