import { StyleSheet, View } from "react-native";
import styled from "styled-components";

import R from "res/R";

export const SearchBarArea = styled.View`
    align-items: center;
    flex-direction: row;
    padding-left: ${R.dimensions.screen.padding};
    padding-right: ${R.dimensions.screen.padding};
`;

export const SearchBarField = styled.View`
    align-items: center;
    border-color: ${({ theme }) => theme.color.lightGrey};
    border-radius: 100px;
    border-width: 2px;
    flex: 1;
    flex-direction: row;
    height: ${R.dimensions.searchBar.inputHeight};
    margin-bottom: 8px;
    margin-top: 8px;
    padding-left: ${R.dimensions.element.padding.small};
    padding-right: ${R.dimensions.element.padding.small};
`;

export default StyleSheet.create({
    textInput: {
        borderWidth: 0,
        flex: 1,
        marginLeft: 8,
        paddingLeft: 5,
        marginTop: 2,
    },
});
