import { View, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components";

import R from "res/R";

export const Root = styled.View`
    margin-top: 15;
`;

export const Row = styled.View`
    position: relative;
`;

export const Input = styled.TextInput`
    border-color: ${({ theme }) => theme.color.lightGrey};
    border-width: 2;
    font-size: 16;
    padding-bottom: 20;
    padding-left: 20;
    padding-right: ${({ hasClear }) => (hasClear ? 50 : 20)};
    padding-top: 20;
`;

export const Clear = styled.TouchableOpacity`
    align-items: center;
    height: 100%;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 50;
`;
