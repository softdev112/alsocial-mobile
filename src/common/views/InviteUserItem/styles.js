import { StyleSheet, TouchableOpacity, View } from "react-native";
import R from "res/R";
import styled from "styled-components";

export const ContainerView = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: ${R.dimensions.element.padding.normal};
    padding-right: ${R.dimensions.element.padding.normal};
    padding-top: ${R.dimensions.element.space.normal};
    padding-bottom: ${R.dimensions.element.space.normal};
    background-color: ${({ theme }) => theme.color.background};
`;

export const SelectionView = styled.View`
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 10px;
    border-width: 1px;
`;

export const SelectedCircleView = styled.View`
    width: 14px;
    height: 14px;
    background-color: ${({ theme }) => theme.color.teal};
    margin-top: 2px;
    margin-left: 2px;
    border-radius: 7px;
`;
export default StyleSheet.create({
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    nameContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: R.dimensions.element.space.normal,
    },
});
