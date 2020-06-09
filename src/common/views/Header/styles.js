import { StyleSheet, View } from "react-native";
import R from "res/R";
import styled from "styled-components";

export const ContentView = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: ${R.dimensions.header.height.normal};
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.color.lightGrey};
`;

export default StyleSheet.create({
    title: {
        fontSize: R.dimensions.text.large,
    },
});
