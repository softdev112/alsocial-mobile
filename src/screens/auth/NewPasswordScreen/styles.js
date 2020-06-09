import styled from "styled-components";
import R from "res/R";
import { Button } from "common/buttons";
import { NormalText, BoldText, DescriptionText } from "common/themed";

export const Error = styled.Text`
    color: ${({ theme }) => theme.color.red};
    font-size: 16px;
    margin-top: 10px;
`;

export const FormView = styled.View`
    margin-top: 60px;
    max-width: 460px;
    padding-left: 22px;
    padding-right: 22px;
    width: 100%;
`;

export const SubmitView = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
`;

export const SubmitButton = styled(Button)`
    align-self: flex-end;
    margin-top: 15px;
`;

export const Header = styled.View``;

export const Title = styled(BoldText)`
    font-size: 22px;
`;

export const Description = styled(DescriptionText)`
    line-height: 22px;
    margin-bottom: 20px;
    margin-top: 20px;
`;
