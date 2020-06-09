import { View, TextInput } from "react-native";
import styled from "styled-components";

import R from "res/R";

export const SearchArea = styled.View`
    align-self: center;
    width: 100%;
`;

export const SearchWrapper = styled.View`
    align-items: center;
    border-color: ${({ theme }) => theme.color.lightGrey};
    border-radius: 100px;
    border-width: 2px;
    flex-direction: row;
    height: 34px;
`;

export const SearchInput = styled.TextInput`
    color: ${({ theme }) => theme.color.dark};
    flex: 1;
    font-family: ${R.fonts.Normal};
    font-size: 16px;
    padding-bottom: 0;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0px;
    margin: 0;
`;
