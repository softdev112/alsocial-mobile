import { StyleSheet } from "react-native";
import styled from "styled-components";

import R from "res/R";

import { AvatarImage } from "common/images";

export const AvatarImageWrap = styled(AvatarImage)`
    align-self: flex-start;
    align-items: center;
    border-color: ${({ theme }) => theme.color.background};
    border-radius: 1000;
    border-width: 6;
    justify-content: center;
    margin-left: 10px;
    margin-top: -40px;
`;

export const AgeAgreement = styled.Text`
    color: ${R.colors.medGrey};
    font-family: ${R.fonts.Normal};
    font-size: 14;
    line-height: 20;
    text-align: center;
`;

export const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    content: {
        marginTop: R.dimensions.element.space.large * 2,
        marginBottom: R.dimensions.element.space.large,
        marginHorizontal: R.dimensions.element.padding.normal,
        flex: 1,
    },
    space: {
        height: R.dimensions.element.space.normal,
    },
    largeSpace: {
        height: R.dimensions.element.space.normal * 2,
    },
    rowSpace: {
        width: R.dimensions.element.space.normal,
    },
    rowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowItemContainer: {
        flex: 1,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
    },
});
