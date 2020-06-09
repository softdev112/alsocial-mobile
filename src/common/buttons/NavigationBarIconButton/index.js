import React from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./styles";
import R from "res/R";
import PropTypes from "prop-types";
import _ from "lodash";

type Props = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    renderIcon: PropTypes.node,
    direction?: PropTypes.string,
};

const NavigationBarIconButton = ({
    onPress = () => {},
    disabled = false,
    isLoading = false,
    renderIcon = null,
    direction = R.strings.direction.left,
}: Props) => (
    <TouchableOpacity
        onPress={onPress}
        style={[
            styles.container,
            direction === R.strings.direction.left ? styles.leftItem : styles.rightItem,
            styles.button,
        ]}
        disabled={disabled || isLoading}
    >
        {isLoading ? <ActivityIndicator /> : renderIcon}
    </TouchableOpacity>
);

export default NavigationBarIconButton;
