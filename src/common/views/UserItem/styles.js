import { StyleSheet, Text, View } from "react-native";
import R from "res/R";
import styled from "styled-components";

export const RepostIconView = styled.View`
    position: absolute;
    bottom: -1px;
    left: ${R.dimensions.image.avatar.normal - 14}px;
    width: 18px;
    height: 18px;
    background-color: #eda751;
    border-radius: 9px;
    align-items: center;
    justify-content: center;
`;

export default StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    nameContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: R.dimensions.element.space.normal,
    },
});
