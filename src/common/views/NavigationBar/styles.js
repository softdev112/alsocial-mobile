import { Text, SafeAreaView, View, StatusBar, TouchableOpacity } from "react-native";
import styled from "styled-components";

import { Button } from "../../buttons";

import R from "res/R";

export const Nav = styled.SafeAreaView`
    align-items: center;
    background-color: ${({ theme, backgroundColor }) =>
        backgroundColor ? backgroundColor : theme.color.background};
    border-width: 0;
    border-bottom-color: ${({ theme }) => theme.color.lightGrey};
    border-bottom-width: ${({ borderWidth }) => borderWidth};
    flex-direction: row;
    height: ${R.dimensions.screen.navigationBarHeight};
    justify-content: space-between;
`;

export const NavButtonClickable = styled.TouchableOpacity`
    align-items: center;
    height: 100%;
    justify-content: center;
    padding-left: 10;
    padding-right: 10;
`;

export const NavButton = styled(Button)``;

export const NavButtonIcon = styled.TouchableOpacity``;

export const CenterArea = styled.View`
    align-items: center;
    justify-content: center;
    max-width: ${R.dimensions.screen.width - 150};
`;

export const LeftArea = styled.View`
    align-items: flex-start;
    height: 100%;
    flex: 1;
    justify-content: center;
    min-width: 50;
`;

export const RightArea = styled.View`
    align-items: flex-end;
    height: 100%;
    flex: 1;
    justify-content: center;
    min-width: 50px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.color.dark};
    font-family: ${R.fonts.Bold};
    font-size: ${R.dimensions.text.normal};
`;
