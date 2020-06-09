import colors from "./colors";
import dimensions from "./dimensions";
import fonts from "./fonts";
const palette = {
    button: {
        normal: {
            fontSize: dimensions.button.textSize.normal,
            letterSpacing: 0.4,
            fontWeight: "600",
        },
        invisible: {
            reaction: {
                paddingHorizontal: dimensions.button.reaction.invisiblePadding,
            },
        },
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        normal: {
            color: colors.dark,
            fontSize: dimensions.button.textSize.normal,
            fontFamily: fonts.Helvetica_Regular,
        },
        bold: {
            color: colors.dark,
            fontSize: dimensions.button.textSize.normal,
            fontFamily: fonts.Helvetica_Bold,
        },
        headerTitle: {
            textAlign: "center",
            color: colors.dark,
            fontSize: dimensions.text.large,
            fontFamily: fonts.Helvetica_Bold,
        },
        title: {
            textAlign: "center",
            color: colors.dark,
            fontSize: 24,
            fontFamily: fonts.Helvetica_Bold,
        },
        description: {
            color: colors.deltaGrey,
            fontSize: dimensions.button.textSize.normal,
            fontFamily: fonts.Helvetica_Regular,
        },
        time: {
            fontSize: dimensions.text.normal,
            fontFamily: fonts.Helvetica_Bold,
            color: colors.lightGrey,
        },
        username: {
            normal: {
                fontSize: dimensions.text.username.normal,
                fontFamily: fonts.Helvetica_Bold,
                color: colors.darkSlate,
            },
        },
        mention: {
            color: colors.dodgerBlue,
            fontWeight: "700",
        },
        hashtag: {
            color: colors.dodgerBlue,
        },
        url: {
            color: colors.teal,
        },
        card: {
            title: {
                color: colors.darkGrey,
                fontSize: dimensions.text.large,
                fontFamily: fonts.Helvetica_Bold,
            },
            url: {
                color: colors.tradewind,
                fontSize: dimensions.text.normal,
                fontFamily: fonts.Helvetica_Regular,
            },
            description: {
                color: colors.darkGrey,
                fontSize: dimensions.text.normal,
                fontFamily: fonts.Helvetica_Regular,
            },
        },
    },
    textInput: {
        normal: {
            fontSize: 16,
            fontFamily: fonts.Helvetica_Regular,
            backgroundColor: colors.white,
            color: colors.dark,
            flexDirection: "row",
            alignItems: "center",
        },
        border: {
            borderWidth: 2,
            borderColor: colors.lightGrey,
            alignItems: "center",
            paddingHorizontal: dimensions.textInput.padding.normal,
        },
        label: {},
    },
    navigationBar: {
        button: {
            backgroundColor: colors.transparent,
            paddingHorizontal: 4,
            marginTop: 8,
        },
        buttonText: {
            color: colors.teal,
            fontSize: dimensions.button.textSize.normal,
        },
        title: {
            fontSize: 16,
            fontFamily: fonts.Helvetica_Bold,
            color: colors.darkSlate,
            textAlign: "center",
        },
    },
    termsOfService: {
        contentTitle: {
            fontFamily: fonts.Helvetica_Bold,
            fontSize: 16,
            color: colors.darkGrey,
        },
        contentText: {
            fontFamily: fonts.Helvetica_Regular,
            fontSize: 16,
            color: colors.darkGrey,
        },
        contentEmail: {
            fontSize: 16,
            color: colors.teal,
        },
    },
    space: {
        top: {
            marginTop: dimensions.element.space.normal,
        },
        right: {
            marginRight: dimensions.element.space.normal,
        },
        left: {
            marginLeft: dimensions.element.space.normal,
        },
        bottom: {
            marginBottom: dimensions.element.space.normal,
        },
    },
};

export default palette;
