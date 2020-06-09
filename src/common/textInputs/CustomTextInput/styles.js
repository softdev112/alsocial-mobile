import { StyleSheet, TextInput } from "react-native";
import styled from "styled-components";

import R from "res/R";

export const InputArea = styled.TextInput`
    font-family: ${R.fonts.Normal};
    font-size: ${R.dimensions.text.normal};
    color: ${({ theme }) => theme.color.text};
    margin: 0;
    background-color: transparent;
    flex-direction: row;
    align-items: center;
    align-self: stretch;
    min-height: 30px;
    padding-top: ${R.dimensions.textInput.padding.small};
    padding-bottom: ${R.dimensions.textInput.padding.small};
    padding-left: ${R.dimensions.textInput.padding.normal};
    padding-right: ${R.dimensions.textInput.padding.normal};
`;
