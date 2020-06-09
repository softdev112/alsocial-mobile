import React, { PureComponent } from "react";
import { Animated, Easing, View } from "react-native";
import PropTypes from "prop-types";
import ReactionButton from "../ReactionButton";
import { HeartIcon } from "res/icons";
import R from "res/R";
import { withTheme } from "styled-components";

class LikeButton extends PureComponent {
    state = {
        isActive: false,
        scale: new Animated.Value(1),
        position: new Animated.Value(0),
    };

    static getDerivedStateFromProps(props, state) {
        if (props.isLiking) {
            return state;
        }
        return {
            ...state,
            isActive: props.isActive,
        };
    }

    _handlePress = () => {
        const { isActive, scale, position } = this.state;
        const { isLoading, onPress } = this.props;
        if (isLoading) {
            return;
        }
        this.setState({
            isActive: !isActive,
        });
        if (!isActive) {
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(position, {
                        toValue: 1,
                        duration: 110,
                    }),
                    Animated.timing(scale, {
                        toValue: 1.4,
                        duration: 110,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(position, {
                        toValue: 0,
                        duration: 110,
                    }),
                    Animated.timing(scale, {
                        toValue: 1,
                        duration: 110,
                    }),
                ]),
            ]).start();
        }
        onPress();
    };

    render() {
        const { isActive } = this.state;
        const { isLiking, small, iconSize, style, theme } = this.props;
        return (
            <ReactionButton
                onPress={this._handlePress}
                disabled={isLiking}
                isLoading={false}
                activeIcon={<HeartIcon active={true} size={iconSize} style={{ marginTop: 5 }} />}
                inactiveIcon={
                    <HeartIcon
                        active={false}
                        size={iconSize}
                        style={{ marginTop: 5 }}
                        fill={theme.color.grey}
                    />
                }
                isActive={isActive}
                small={small}
                style={{ paddingLeft: R.dimensions.screen.width < 350 ? 10 : 5, ...style }}
            />
        );
    }
}

LikeButton.propTypes = {
    isActive: PropTypes.bool,
    onPress: PropTypes.func,
    isLiking: PropTypes.bool,
    small: PropTypes.bool,
    iconSize: PropTypes.number,
    style: PropTypes.object,
};

LikeButton.defaultProps = {
    isActive: false,
    onPress: () => {},
    small: false,
    iconSize: 24,
    style: {},
};

export default withTheme(LikeButton);
