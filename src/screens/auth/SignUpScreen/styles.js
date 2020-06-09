import { StyleSheet, View, TouchableOpacity } from "react-native";
import styled from "styled-components";

import R from "res/R";

import { Button } from "common/buttons";
import { NormalText, BoldText, DescriptionText } from "common/themed";

export const Error = styled(NormalText)`
    color: ${({ theme }) => theme.color.red};
    margin-top: 10px;
`;

export const SignUpView = styled.View`
    flex: 1;
    justify-content: flex-start;
    max-width: 460px;
    padding-bottom: 40px;
    padding-left: 22px;
    padding-right: 22px;
    width: 100%;
`;

export const SubmitButton = styled(Button)`
    align-self: flex-end;
    margin-top: 15px;
`;

export const Header = styled.View`
    margin-bottom: 10px;
    margin-top: 20px;
    width: 100%;
`;

export const Title = styled(BoldText)`
    color: ${({ theme }) => theme.color.dark};
    font-size: 22px;
`;

export const AuthConditions = styled.View`
    flex: 1;
    justify-content: flex-end;
    margin-top: 40px;
`;

export const AuthAgreement = styled(DescriptionText)`
    font-size: ${R.dimensions.text.small};
    text-align: center;
    line-height: 24px;
`;

export const AuthText = styled(BoldText)`
    color: ${({ theme }) => theme.color.medGrey};
    font-size: ${R.dimensions.text.small};
    line-height: 24px;
`;
