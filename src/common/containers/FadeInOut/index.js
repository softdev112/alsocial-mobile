import React, { PureComponent } from "react";
import { Animated } from "react-native";

type Props = {
    visible: boolean,
};

class FadeInOut extends PureComponent<Props, State> {
    state = {
        _visibility: new Animated.Value(0),
        visible: true,
    };

    static getDerivedStateFromProps(props, state) {
        if (props.visible !== state.visible) {
            return {
                ...state,
                visible: props.visible,
            };
        }
        return state;
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {
        if (prevState.visible !== this.state.visible) {
            Animated.timing(this.state._visibility, {
                toValue: this.state.visible ? 1 : 0,
                duration: 10,
            }).start();
        }
    }

    render() {
        const { visible, style, children, ...rest } = this.props;
        if (!visible) {
            return null;
        }
        const containerStyle = {
            opacity: this.state.visible ? 1 : 0,
        };

        const combinedStyle = [containerStyle, style];
        return (
            <Animated.View
                style={combinedStyle}
                pointerEvents={visible ? "auto" : "none"}
                {...rest}
            >
                {children}
            </Animated.View>
        );
    }
}
export default FadeInOut;
