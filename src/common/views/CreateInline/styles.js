import { StyleSheet, Text, View } from "react-native";
import R from "res/R";
import styled from "styled-components";

export const PlaceholderText = styled.Text`
    padding-left: ${R.dimensions.element.space.normal};
    padding-right: ${R.dimensions.element.space.normal};
    color: ${({ theme }) => theme.color.text};
`;

export default StyleSheet.create({
    content: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: R.dimensions.element.padding.normal,
        width: "100%",
    },
    iconWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});
