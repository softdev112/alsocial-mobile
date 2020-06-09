import { StyleSheet, View } from "react-native";
import R from "res/R";
import styled from "styled-components";

export const ContentView = styled.View`
    background-color: ${({ theme }) => theme.color.lightGrey};
`;

export default StyleSheet.create({
    cover: {
        width: "100%",
        height: "100%",
    },
    cameraIcon: {
        position: "absolute",
        top: R.dimensions.element.padding.normal,
        left: R.dimensions.element.padding.normal,
        zIndex: 9999,
    },
});
