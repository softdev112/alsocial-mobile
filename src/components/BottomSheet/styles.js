import { Platform } from "react-native";
import styled from "styled-components";

export const SheetOption = styled.View`
    background-color: ${({ theme }) => theme.color.background};
    height: 50;
    justify-content: center;
    align-items: center;
`;

export const SheetOptionText = styled.Text`
    color: ${({ theme }) => theme.color.text};
    font-size: 18;
`;

export const Sheet = styled.View`
    padding-top: 30;
`;

export const SheetContainer = styled.View`
    background-color: ${({ theme }) => theme.color.background};
    padding-bottom: ${Platform.OS === "android" ? "0px" : "500px"};
    border-top-left-radius: 5;
    border-top-right-radius: 5;
    overflow: hidden;
`;

export const SheetHandle = styled.View`
    background-color: ${({ theme }) => theme.color.background};
    width: 50;
    height: 4;
    border-radius: 10;
    align-self: center;
    margin-vertical: 8;
`;

export const Overlay = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.color.overlayColor};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const OverlayContainer = styled.TouchableOpacity`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;
