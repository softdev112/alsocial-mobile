import { StyleSheet, View } from "react-native";
import R from "res/R";
import styled from "styled-components";

export const HeaderContainerView = styled.View`
    border-top-color: ${({ theme }) => theme.color.lightGrey};
    border-top-width: ${R.dimensions.element.border.normal};
`;
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    topSpace: {
        marginTop: R.dimensions.element.space.normal,
    },
    bottomSpace: {
        marginBottom: R.dimensions.element.space.normal,
    },
    content: {
        marginHorizontal: R.dimensions.element.padding.normal,
    },
});
