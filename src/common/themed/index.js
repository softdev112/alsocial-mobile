import styled from "styled-components";
import { Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import R from "res/R";

export const NormalText = styled.Text`
    font-family: ${R.fonts.Normal};
    font-size: ${R.dimensions.text.normal};
    color: ${({ theme }) => theme.color.text};
`;

export const DescriptionText = styled.Text`
    font-family: ${R.fonts.Normal};
    font-size: ${R.dimensions.text.normal};
    color: ${({ theme }) => theme.color.medGrey};
`;

export const LargeText = styled.Text`
    font-family: ${R.fonts.Normal};
    font-size: ${R.dimensions.text.large};
    color: ${({ theme }) => theme.color.text};
`;

export const BoldText = styled.Text`
    font-family: ${R.fonts.Bold};
    font-size: ${R.dimensions.text.normal};
    color: ${({ theme }) => theme.color.text};
`;

export const TealText = styled.Text`
    font-family: ${R.fonts.Normal};
    font-size: ${R.dimensions.text.normal};
    color: ${({ theme }) => theme.color.link};
`;

export const ContainerView = styled.SafeAreaView`
    display: flex;
    flex: 1;
    background-color: ${({ isFullscreen, theme }) =>
        isFullscreen ? "#000" : theme.color.background};
`;

export const ContentView = styled.View`
    display: flex;
    flex: 1;
    background-color: ${({ theme }) => theme.color.background};
`;

export const TouchableContentView = styled.TouchableOpacity`
    display: flex;
    background-color: ${({ theme }) => theme.color.background};
`;

export const StatusBarView = styled.View`
    background-color: ${({ theme }) => theme.color.background};
    height: ${R.dimensions.screen.statusBarHeight};
`;

export const LineView = styled.View`
    height: 1px;
    background-color: ${({ theme }) => theme.color.lightGrey};
`;

export const SeparatorView = styled.View`
    height: ${R.dimensions.element.space.normal}px;
    background-color: ${({ theme }) => theme.color.lightGrey};
`;

export const Title = styled(BoldText)`
    line-height: 32px;
`;

export const Content = styled(NormalText)`
    line-height: 22px;
`;
