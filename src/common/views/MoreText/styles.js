import { StyleSheet } from "react-native";
import styled from "styled-components";
import R from "res/R";
import { NormalText } from "../../themed";

export const TextWrap = styled(NormalText)`
    font-size: 16px;
    line-height: 24px;
`;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    moreContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: R.dimensions.element.space.small,
    },
    more: {
        marginRight: R.dimensions.element.space.small,
    },
});
