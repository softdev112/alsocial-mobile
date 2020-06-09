// @flow
import React, { PureComponent } from "react";
import { TouchableOpacity, Text } from "react-native";
import { NormalText } from "common/themed";
import { withTheme } from "styled-components";
import PropTypes from "prop-types";

class NewActivity extends PureComponent {
    render() {
        const { counter, onPress, theme } = this.props;
        const label = counter ? `You have ${counter} new ${counter > 1 ? "posts" : "post"}` : null;

        return (
            label && (
                <TouchableOpacity
                    onPress={onPress}
                    style={{ backgroundColor: theme.color.teal, padding: 12 }}
                >
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontWeight: "700",
                        }}
                    >
                        {label}
                    </Text>
                </TouchableOpacity>
            )
        );
    }
}

NewActivity.propTypes = {
    counter: PropTypes.number,
    onPress: PropTypes.func,
};

export default withTheme(NewActivity);
