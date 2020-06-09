import styled from "styled-components";

import dimensions from "res/dimensions";

export const StyledContainerView = styled.View`
    padding: ${dimensions.screen.padding}px ${dimensions.element.padding.normal}px
        ${dimensions.screen.padding}px ${dimensions.element.padding.normal}px;
`;

export const PrivateContainerView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const StyledSafeAreaView = styled.SafeAreaView`
    display: flex;
    flex: 1;
`;
