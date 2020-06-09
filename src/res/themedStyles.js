import fonts from "./fonts";
import dimensions from "./dimensions";
import { Platform } from "react-native";
import colors from "./colors";

const themedStyles = theme => {
    return {
        pickerStyles: {
            backgroundColor: theme.color.background,
            iconContainer: {
                top: Platform.select({ ios: 5, android: 22 }),
            },
            inputIOS: {
                color: theme.color.text,
                paddingRight: 30, // to ensure the text is never behind the icon
            },
            inputAndroid: {
                color: theme.color.text,
                paddingRight: 30, // to ensure the text is never behind the icon
            },
        },
        textInput: {
            normal: {
                fontSize: 16,
                fontFamily: fonts.Normal,
                backgroundColor: "transparent",
                color: theme.color.dark,
                flexDirection: "row",
                alignItems: "center",
            },
            border: {
                borderWidth: 2,
                borderColor: theme.color.lightGrey,
                alignItems: "center",
                paddingHorizontal: dimensions.textInput.padding.normal,
            },
        },
        card: {
            title: {
                color: theme.color.text,
                fontSize: dimensions.text.large,
                fontFamily: fonts.Helvetica_Bold,
            },
            url: {
                color: theme.color.teal,
                fontSize: dimensions.text.normal,
                fontFamily: fonts.Helvetica_Regular,
            },
            description: {
                color: theme.color.text,
                fontSize: dimensions.text.normal,
                fontFamily: fonts.Helvetica_Regular,
            },
        },
        text: {
            normal: {
                color: theme.color.dark,
                fontSize: dimensions.button.textSize.normal,
                fontFamily: fonts.Normal,
            },
            bold: {
                color: theme.color.dark,
                fontSize: dimensions.button.textSize.normal,
                fontFamily: fonts.Bold,
            },
            headerTitle: {
                textAlign: "center",
                color: theme.color.dark,
                fontSize: dimensions.text.large,
                fontFamily: fonts.Bold,
            },
            title: {
                textAlign: "center",
                color: theme.color.dark,
                fontSize: 24,
                fontFamily: fonts.Bold,
            },
            description: {
                color: theme.color.medGrey,
                fontSize: dimensions.button.textSize.normal,
                fontFamily: fonts.Normal,
            },
            time: {
                fontSize: dimensions.text.normal,
                fontFamily: fonts.Bold,
                color: theme.color.lightGrey,
            },
            mention: {
                color: theme.color.teal,
                fontWeight: "700",
            },
            hashtag: {
                color: theme.color.teal,
            },
            url: {
                color: theme.color.teal,
            },
        },
    };
};

export default themedStyles;
