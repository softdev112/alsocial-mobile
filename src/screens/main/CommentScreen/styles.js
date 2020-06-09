import { StyleSheet, Platform, SafeAreaView, Text } from "react-native";
import R from "res/R";
import styled from "styled-components";

export default StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    content: {
        flex: 1,
        flexDirection: "column-reverse",
    },
    deletedContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        margin: 0,
        padding: 0,
        paddingHorizontal: R.dimensions.textInput.padding.normal,
        paddingVertical: Platform.select({ ios: 8, android: 2 }),
        maxHeight: 200,
        lineHeight: 20,
    },
});
