import { StyleSheet, View, Text } from "react-native";
import styled from "styled-components";

import R from "res/R";

export const ContainerView = styled.View`
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    width: ${R.dimensions.suggestion.width};
    height: ${R.dimensions.suggestion.height};
    padding: ${R.dimensions.element.padding.small}px 2px;
    background-color: ${({ theme }) => theme.color.background};
    border-color: ${({ theme }) => theme.color.lightGrey};
    border-width: 1px;
    border-radius: 4px;
`;

export const UsernameText = styled.Text`
    color: ${({ theme }) => theme.color.text};
    font-family: ${R.fonts.Normal};
    font-size: ${R.dimensions.suggestion.textSize};
    text-align: center;
`;

export default StyleSheet.create({
    button: {
        fontSize: 12,
    },
    buttonText: {
        fontSize: R.dimensions.suggestion.buttonText,
    },
});
