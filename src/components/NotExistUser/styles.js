import { StyleSheet } from "react-native";
import R from "res/R";
import { NormalText, BoldText } from "common/themed";
import styled from "styled-components";

export const HeaderWrap = styled(BoldText)`
    font-size: 24px;
    text-align: center;
`;

export const ContentWrap = styled(NormalText)`
    text-align: center;
    margin-top: ${R.dimensions.element.space.large};
`;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: R.colors.white,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: R.dimensions.screen.padding,
    },
});
