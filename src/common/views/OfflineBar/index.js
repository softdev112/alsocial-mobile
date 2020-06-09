import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text, TouchableWithoutFeedback, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import styles from "./styles";

class OfflineBar extends Component {
    static propTypes = {
        offlineText: PropTypes.string,
    };

    static getDerivedStateFromProps(props, state) {
        if (!props.isConnected) return null;
        return {
            ...state,
            hideLabel: props.isConnected,
        };
    }

    state = {
        statusBarHeight: getStatusBarHeight(),
        hideLabel: true,
    };

    handlePress = () => {
        this.setState({ hideLabel: false });
    };

    render() {
        const { offlineText = "You are not connected to the Internet", isConnected } = this.props;
        const { statusBarHeight } = this.state;

        if (!this.state.hideLabel || isConnected) return null;

        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <View
                    style={[
                        styles.container,
                        { top: Platform.OS === "android" ? 0 : statusBarHeight },
                    ]}
                >
                    <Text style={[styles.offlineText]}>{offlineText}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = state => ({
    isConnected: state.network.isConnected,
});

export default connect(mapStateToProps)(OfflineBar);
