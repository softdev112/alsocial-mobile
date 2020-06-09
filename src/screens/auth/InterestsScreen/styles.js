import { StyleSheet, View } from "react-native";
import R from "res/R";
import styled from "styled-components";
import { NormalText, BoldText } from "common/themed";

export const ItemContainerView = styled.View`
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 6px;
    padding-bottom: 6px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
    border-width: 2px;
    border-radius: 100px;
    border-color: ${({ selected, theme }) =>
        selected ? theme.color.button : theme.color.lightGrey};
    background: ${({ selected, theme }) => (selected ? theme.color.button : "transparent")};
`;

export const ItemLabel = styled(BoldText)`
    color: ${({ selected, theme }) => (selected ? "white" : theme.color.buttonBorderedText)};
`;
export const HeaderTitle = styled(NormalText)`
    margin-top: ${R.dimensions.element.space.normal};
    margin-bottom: ${R.dimensions.element.space.normal};
    text-align: center;
`;
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    containerGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 40,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    gridView: {
        flex: 1,
    },
    header: {
        paddingBottom: R.dimensions.element.padding.normal,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
});
