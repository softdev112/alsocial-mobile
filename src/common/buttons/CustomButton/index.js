import React from "react";
import { TouchableOpacity, Text, Keyboard } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { NormalText } from "../../themed";

export type Props = {
    disabled: boolean,
    isLoading: boolean,
    title: PropTypes.string,
    onPress: PropTypes.func,
    textStyle?: PropTypes.object,
    buttonStyle?: PropTypes.object,
    indicator?: PropTypes.node,
};

const CustomButton = ({
    title = "",
    onPress = () => {},
    textStyle = null,
    buttonStyle = null,
    indicator = null,
    disabled = false,
    isLoading = false,
}: Props) => (
    <TouchableOpacity
        onPress={
            disabled || isLoading
                ? null
                : () => {
                      Keyboard.dismiss();
                      onPress();
                  }
        }
        style={{ ...styles.button, ...buttonStyle, opacity: disabled ? 0.5 : 1 }}
        disabled={disabled || isLoading}
    >
        {isLoading && indicator ? (
            indicator
        ) : (
            <NormalText style={[{ textAlign: "center" }, textStyle]}>{title}</NormalText>
        )}
    </TouchableOpacity>
);

export default CustomButton;
