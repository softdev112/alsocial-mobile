import styled from "styled-components";
import { Text, View, TouchableOpacity } from "react-native";

export const Area = styled.TouchableOpacity`
    background: ${({ type, theme }) =>
        type === "outline" || type === "text" ? "transparent" : theme.color.button};
    border-radius: 100px;
    border-color: ${({ type, theme, borderColor }) =>
        borderColor ? borderColor : type === "outline" ? theme.color.lightGrey : "transparent"};
    border-width: ${({ type }) => (type === "outline" ? 2 : 0)};
    opacity: ${({ opacity }) => opacity};
    padding-bottom: ${({ size }) => (size === "large" ? 16 : 8)};
    padding-left: ${({ size }) => (size === "large" ? 24 : 14)};
    padding-right: ${({ size }) => (size === "large" ? 24 : 14)};
    padding-top: ${({ size }) => (size === "large" ? 16 : 8)};
`;

export const Label = styled.Text`
    color: ${({ type, theme, color }) =>
        color
            ? color
            : type === "outline"
            ? theme.color.buttonBorderedText
            : type === "text"
            ? theme.color.teal
            : "white"};
    font-size: ${({ size }) => (size === "small" ? 14 : 16)};
    font-weight: 600;
    text-align: center;
    opacity: ${({ showLoader }) => (showLoader ? 0 : 1)};
`;

export const Loader = styled.View`
    align-items: center;
    bottom: 0;
    left: 0;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
`;
