import { StyleSheet, ScrollView } from "react-native";
import R from "res/R";
import styled from "styled-components";

export const ContainerScrollView = styled.ScrollView`
    display: flex;
    flex: 1;
    background-color: ${({ theme }) => theme.color.background};
`;

export default StyleSheet.create({
    flex: {
        flex: 1,
    },
    textInputContainer: {
        marginHorizontal: R.dimensions.element.padding.normal,
        marginVertical: R.dimensions.element.padding.normal,
    },
    textInput: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    container: {
        flexGrow: 1,
    },
});
