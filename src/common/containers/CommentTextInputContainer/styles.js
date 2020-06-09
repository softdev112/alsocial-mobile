import { View } from "react-native";

import R from "res/R";

import { Button } from "../../buttons";

import styled from "styled-components";

export const CommentView = styled.View`
    align-items: flex-end;
    background: ${({ theme }) => theme.color.background};
    border-color: ${({ theme }) => theme.color.lightGrey};
    border-top-width: 1px;
    flex-direction: row;
    max-height: 120px;
    justify-content: center;
    padding-left: ${R.dimensions.textInput.padding.normal};
    padding-right: ${R.dimensions.textInput.padding.normal};
    padding-top: ${R.dimensions.element.space.normal};
    padding-bottom: ${R.dimensions.element.space.normal};
`;

export const CommentButton = styled(Button)`
    margin-left: 10px;
`;
