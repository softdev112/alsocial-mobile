import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";

type Props = {
    onPress: PropTypes.func,
    disabled?: PropTypes.bool,
    icon?: PropTypes.node,
    style?: PropTypes.object,
};

const IconButton = ({ onPress = () => {}, disabled = false, icon, style = null }: Props) => {
    return (
        <TouchableOpacity
            onPress={disabled ? null : onPress}
            style={[styles.container, style, { opacity: disabled ? 0.5 : 1 }]}
            disabled={disabled}
        >
            {icon}
        </TouchableOpacity>
    );
};

export default IconButton;
