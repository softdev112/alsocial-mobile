import { StyleSheet, View } from "react-native";
import R from "res/R";
import styled from "styled-components";

export const BottomLineView = styled.View`
    border-bottom-color: ${({ theme }) => theme.color.lightGrey};
    border-bottom-width: ${R.dimensions.element.border.normal};
    height: ${R.dimensions.element.space.normal};
`;

export default StyleSheet.create({
    content: {
        flex: 1,
    },
    space: {
        height: R.dimensions.element.space.normal,
    },
    inputContainer: {
        marginHorizontal: R.dimensions.element.padding.normal,
        marginVertical: R.dimensions.element.space.normal,
    },
    flex: { flex: 1 },
    flexGrow: { flexGrow: 1, flex: 1 },
    input: {
        margin: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginBottom: R.dimensions.element.space.normal,
    },
});
