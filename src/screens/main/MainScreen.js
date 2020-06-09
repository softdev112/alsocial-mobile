import React, { Component } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import MainNavigator from "../navigation/MainNavigator";
import { withTheme } from "styled-components";

class MainScreen extends Component {
    static router = {
        ...MainNavigator.router,
        getStateForAction: (action, lastState) => {
            return MainNavigator.router.getStateForAction(action, lastState);
        },
    };

    render() {
        const { navigation, theme } = this.props;
        return (
            <KeyboardAvoidingView
                style={{ flex: 1, justifyContent: "flex-end" }}
                behavior='padding'
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -310}
                enabled
            >
                <MainNavigator navigation={navigation} screenProps={{ theme }} />
            </KeyboardAvoidingView>
        );
    }
}

export default withTheme(MainScreen);
