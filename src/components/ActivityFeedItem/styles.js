import { StyleSheet, View } from "react-native";
import R from "res/R";
import styled from "styled-components";

export const ContainerView = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.color.background};
`;
