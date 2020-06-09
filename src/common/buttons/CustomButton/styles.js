import { StyleSheet } from "react-native";
import R from "res/R";

export default StyleSheet.create({
    button: {
        ...R.palette.center,
    },
    text: {
        color: R.colors.grey,

        ...R.palette.button.normal,
    },
});
