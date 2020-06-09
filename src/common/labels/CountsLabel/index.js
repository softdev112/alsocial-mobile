import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { CountLabel } from "./styles";
import { followersFormatter } from "utils/helper";

class CountsLabel extends Component {
    render() {
        const {
            hasSuffix,
            isShow,
            counts,
            label,
            onPress,
            style,
            countStyle,
            textStyle,
            disabled,
        } = this.props;
        const { quantity, letter } = followersFormatter(counts);
        return isShow || counts > 0 ? (
            <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
                <CountLabel style={textStyle}>
                    <Text style={countStyle}>{`${quantity}`}</Text>
                    {`${letter} ${label}${hasSuffix && counts > 1 ? "s" : ""}`}
                </CountLabel>
            </TouchableOpacity>
        ) : null;
    }
}

CountsLabel.propTypes = {
    counts: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    style: PropTypes.object,
    countStyle: PropTypes.object,
    textStyle: PropTypes.object,
    isShow: PropTypes.bool,
    hasSuffix: PropTypes.bool,
    disabled: PropTypes.bool,
};

CountsLabel.defaultProps = {
    counts: 0,
    label: "",
    onPress: () => {},
    style: {},
    countStyle: {},
    textStyle: {},
    isShow: false,
    hasSuffix: true,
    disabled: false,
};

export default CountsLabel;
