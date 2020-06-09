import { StyleSheet, Text } from "react-native";
import styled from "styled-components";
import R from "res/R";

export const TextWrap = styled.Text`
    font-family: ${R.fonts.Normal};
    color: ${({ theme }) => theme.color.dark};
    text-align: center;
    font-size: ${R.dimensions.text.small};
`;
