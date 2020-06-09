import { TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components";

import R from "res/R";

export const AvatarArea = styled.TouchableOpacity`
    height: ${({ size }) => size};
    width: ${({ size }) => size};
`;

export const Avatar = styled.Image`
    border-radius: 1000;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.color.lightGrey};
`;

export const styles = StyleSheet.create({
    cameraIcon: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
    },
});
