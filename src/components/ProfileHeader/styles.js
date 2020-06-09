import { StyleSheet, View, Text } from "react-native";
import styled from "styled-components";

import R from "res/R";

import { AvatarImage } from "common/images";

export const AvatarImageWrap = styled(AvatarImage)`
    border-color: ${({ theme }) => theme.color.background};
    border-radius: 1000;
    border-width: 6;
    margin-left: 10px;
    margin-top: -40px;
    position: relative;
    z-index: 2;
`;

export const Name = styled.Text`
    color: ${R.colors.medGrey};
    font-size: 20;
`;

export const MetaArea = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 10;
    margin-left: -5;
    margin-top: 20;
`;

export const Meta = styled.View`
    align-items: center;
    align-self: stretch;
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: ${({ marginRight }) => marginRight || 0};
`;

export const MetaText = styled.Text`
    color: ${({ color, theme }) => color || theme.color.dark};
    font-size: ${R.dimensions.text.normal};
    margin-left: 3;
    max-width: ${R.dimensions.screen.width - 60};
`;

export const styles = StyleSheet.create({
    actionMargin: {
        marginTop: -R.dimensions.button.height.small,
        marginRight: R.dimensions.element.padding.normal,
    },
    actionWrapper: {
        alignItems: "center",
        marginTop: -36,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    content: {
        marginTop: R.dimensions.element.space.large * 2,
        marginBottom: R.dimensions.element.space.large,
        marginHorizontal: R.dimensions.element.padding.normal,
        flex: 1,
    },
    followWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    space: {
        marginTop: R.dimensions.element.space.normal * 2,
    },
    metaItem: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignSelf: "stretch",
        alignItems: "center",
    },
});
