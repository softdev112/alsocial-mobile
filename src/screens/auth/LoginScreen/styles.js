import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

import R from "res/R";

import { Button } from "common/buttons";

export const Error = styled.Text`
    color: ${({ theme }) => theme.color.red};
    font-size: 16px;
    margin-top: 10px;
`;

export const LoginView = styled.View`
    flex: 1;
    justify-content: flex-start;
`;

export const LoginForm = styled.View`
    margin-top: 20px;
    max-width: 460px;
    padding-left: 22px;
    padding-right: 22px;
    width: 100%;
`;

export const SubmitView = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`;

export const SubmitButton = styled(Button)`
    align-self: flex-end;
    margin-top: 15px;
`;

export const ForgotPassword = styled.TouchableOpacity`
    margin-top: 15px;
`;

export const ForgotPasswordText = styled.Text`
    color: ${({ theme }) => theme.color.medGrey};
    font-size: 16px;
`;

export const Header = styled.View`
    margin-bottom: 10px;
    margin-top: 20px;
    width: 100%;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.color.text};
    font-family: ${R.fonts.Bold}
    font-size: 22px;
`;
