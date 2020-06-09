import { View, Text } from "react-native";
import styled from "styled-components";

import { Logo } from "common/icons";

import R from "res/R";

const theme = R.theme("light");

export const AuthView = styled.View`
    align-items: center;
    flex: 1;
    justify-content: center;
    background-color: ${theme.color.background};
`;

export const LogoImage = styled(Logo)`
    margin-top: 32px;
    margin-left: auto;
    margin-right: auto;
`;

export const TagLineView = styled.View`
    align-items: center;
    justify-content: center;
    margin-bottom: 80;
    margin-top: 70;
    position: relative;
    width: 100%;
`;

export const TagLine = styled.Text`
    color: ${theme.color.text};
    font-family: ${R.fonts.Normal};
    font-size: 32;
    line-height: 42;
    max-width: 290;
    position: relative;
    z-index: 3;
`;

export const ShapeRect = styled.View`
    background: #bcbcbc;
    height: 300;
    left: -50;
    position: absolute;
    top: 270;
    transform: rotate(-5deg);
    width: 100;
    z-index: 1;
`;

export const ShapeSide = styled.View`
    background: #f6e3df;
    height: 140;
    position: absolute;
    right: 0;
    top: 72;
    width: 230;
    z-index: 1;
`;

export const ShapeDiag = styled.View`
    background: #fba75f;
    height: 300;
    position: absolute;
    right: -130;
    top: -10;
    transform: rotate(15deg);
    width: 160;
    z-index: 1;
`;

export const ButtonsView = styled.View`
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 32px;
`;
