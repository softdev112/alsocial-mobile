import React, { PureComponent } from "react";
import { View } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";

class MentionTextInputContainer extends PureComponent {
    render() {
        const { onLayout, inputContainerStyle, children } = this.props;
        return (
            <View
                onLayout={onLayout}
                style={{ ...styles.inputContainerStyle, ...inputContainerStyle }}
            >
                {children}
            </View>
        );
    }
}

MentionTextInputContainer.propTypes = {
    onLayout: PropTypes.func,
    inputContainerStyle: PropTypes.object,
    children: PropTypes.element.isRequired,
};
MentionTextInputContainer.defaultProps = {
    onLayout: nativeEvent => {},
    inputContainer: {},
};

export default MentionTextInputContainer;
