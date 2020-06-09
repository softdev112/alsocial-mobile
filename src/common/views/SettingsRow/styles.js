import { StyleSheet, TouchableOpacity } from "react-native";
import R from "res/R";
import styled from "styled-components";

const verticalPadding =
    R.dimensions.screen.height > 640
        ? R.dimensions.element.padding.normal
        : R.dimensions.element.space.normal;

export const ContainerView = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: ${verticalPadding};
    padding-bottom: ${verticalPadding};
    padding-left: ${R.dimensions.element.padding.normal};
    padding-right: ${R.dimensions.element.padding.normal};
    border-bottom-color: ${({ theme }) => theme.color.lightGrey};
    border-bottom-width: 1px;
`;
export default StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
});
