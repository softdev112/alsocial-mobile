import { StyleSheet, View } from "react-native";
import styled from "styled-components";

import R from "res/R";

export const Container = styled.SafeAreaView`
    background-color: ${({ theme }) => theme.color.background};
    display: flex;
    flex: 1;
`;

export const SeparatorView = styled.View`
    height: ${R.dimensions.element.space.normal};
    background-color: ${({ theme }) => theme.color.lightGrey};
`;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: R.colors.white,
    },
    separator: {
        height: R.dimensions.element.space.normal,
        backgroundColor: R.colors.borderGrey,
    },
});
