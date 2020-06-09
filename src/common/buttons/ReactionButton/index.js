import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import R from "res/R";

type Props = {
    onPress: PropTypes.func,
    disabled?: PropTypes.bool,
    isLoading?: PropTypes.bool,
    activeIcon?: PropTypes.node,
    inactiveIcon: PropTypes.node,
    isActive?: PropTypes.bool,
    style?: PropTypes.object,
    small?: PropTypes.bool,
};

const ReactionButton = ({
    onPress = () => {},
    disabled = false,
    isLoading = false,
    activeIcon,
    inactiveIcon,
    isActive = false,
    style = null,
    small = false,
}: Props) => {
    return (
        <TouchableOpacity
            onPress={disabled || isLoading ? null : onPress}
            style={[
                styles.reaction,
                style,
                small
                    ? {
                          height: R.dimensions.button.reaction.small,
                          width: R.dimensions.button.reaction.small,
                      }
                    : null,
            ]}
            activeOpacity={1}
            disabled={disabled || isLoading}
        >
            {isActive ? activeIcon : inactiveIcon}
        </TouchableOpacity>
    );
};

export default ReactionButton;
