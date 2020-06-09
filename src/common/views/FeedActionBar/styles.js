import { StyleSheet, View } from "react-native";
import styled from "styled-components";

import R from "res/R";

export const Container = styled.View`
    flex-direction: row;
    height: ${R.dimensions.footer.height};
    justify-content: space-between;
    width: 100%;
`;

export const ReactionContainer = styled.View`
    align-items: flex-end;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    max-width: 180;
`;

export const CountsLabelContainer = styled.View`
    align-items: center;
    flex-direction: row;
    padding-right: 14;
`;

export const styles = StyleSheet.create({
    leftLabel: {
        paddingLeft: 5,
    },
    rightLabel: {
        paddingLeft: 10,
    },
    reaction: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        flexGrow: 1,
    },
});
