import { StyleSheet, Text } from "react-native";
import R from "res/R";
import styled from "styled-components";

export const CountLabel = styled.Text`
    font-family: ${R.fonts.Bold};
    font-size: ${R.dimensions.text.normal};
    color: ${({ theme }) => theme.color.darkGrey};
`;
