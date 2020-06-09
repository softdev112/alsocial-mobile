import styled from "styled-components";
import R from "res/R";
import { Button } from "common/buttons";
import { NormalText, BoldText, DescriptionText } from "common/themed";

export const Error = styled(NormalText)`
    color: ${({ theme }) => theme.color.red};
    margin-top: 10px;
`;

export const FormView = styled.View`
    margin-top: 60;
    max-width: 460;
    padding-left: 22;
    padding-right: 22;
    width: 100%;
`;

export const SubmitView = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
`;

export const SubmitButton = styled(Button)`
    align-self: flex-end;
    margin-top: 15;
`;

export const Header = styled.View``;

export const Title = styled(BoldText)`
    font-size: 22px;
`;

export const Description = styled(DescriptionText)`
    margin-bottom: 20px;
    margin-top: 20px;
`;
