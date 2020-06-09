import React from "react";
import { Animated, ActivityIndicator } from "react-native";
import { Area, Label, Loader } from "./styles";
import PropTypes from "prop-types";
import R from "res/R";

export type Props = {
    label: PropTypes.string,
    onPress: PropTypes.func,
    indicatorColor?: PropTypes.string,
    disabled: boolean,
    isLoading: boolean,
    size: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.object,
    textColor: PropTypes.string,
    borderColor: PropTypes.string,
};

const Button = ({
    label = "",
    onPress = () => {},
    indicatorColor = R.colors.white,
    disabled = false,
    isLoading = false,
    size = "normal",
    type = "button",
    style = {},
    textColor = null,
    borderColor = null,
}: Props) => {
    const AnimatedArea = Animated.createAnimatedComponent(Area);

    return (
        <AnimatedArea
            onPress={disabled || isLoading ? null : onPress}
            size={size}
            style={style}
            activeOpacity={disabled ? 0.5 : 1}
            type={type}
            opacity={new Animated.Value(disabled ? 0.5 : 1)}
            borderColor={borderColor}
        >
            {isLoading && (
                <Loader>
                    <ActivityIndicator size='small' color={indicatorColor} />
                </Loader>
            )}
            <Label type={type} showLoader={isLoading} size={size} color={textColor}>
                {label}
            </Label>
        </AnimatedArea>
    );
};

export default Button;
