import { View } from "react-native";
import styled from "styled-components";

import { IconButton } from "common/buttons";

import R from "res/R";

export const IconRow = styled.View`
    align-items: center;
    flex-direction: row;
    height: ${R.dimensions.footer.height};
    justify-content: flex-start;
`;

export const IconView = styled(IconButton)`
    height: 100%;
    padding-left: 24;
    padding-right: 24;
`;
