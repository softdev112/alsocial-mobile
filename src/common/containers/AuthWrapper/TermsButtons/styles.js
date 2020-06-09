import { StyleSheet, View } from "react-native";
import R from "res/R";
import styled from "styled-components";

export const ContentView = styled.View`
    flex-direction: row;
    justify-content: space-around;
    border-top-color: ${({ theme }) => theme.color.lightGrey};
    border-top-width: 1px;
`;

export default StyleSheet.create({
    button: {
        height: R.dimensions.button.height.normal,
        ...R.palette.center,
    },
});
