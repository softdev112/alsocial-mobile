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
    tabStyle: {
        backgroundColor: R.colors.white,
        color: R.colors.teal,
        borderColor: R.colors.teal,
    },
    tabTextStyle: {
        color: R.colors.teal,
    },
    activeTabStyle: {
        backgroundColor: R.colors.teal,
    },
    activeTabTextStyle: {
        color: R.colors.white,
    },
});
