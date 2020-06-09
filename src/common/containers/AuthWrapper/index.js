import React, { PureComponent } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

class AuthWrapper extends PureComponent {
    _renderContent = () => {
        const { children } = this.props;
        // const { isKeyboard } = this.state;
        return (
            <ScrollView
                style={{ flex: 1 }}
                keyboardShouldPersistTaps={"handled"}
                keyboardDismissMode={"interactive"}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
            >
                {children}
            </ScrollView>
        );
    };

    render() {
        return Platform.OS === "ios" ? (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
                {this._renderContent()}
            </KeyboardAvoidingView>
        ) : (
            <KeyboardAvoidingView style={{ flex: 1 }}>{this._renderContent()}</KeyboardAvoidingView>
        );
    }
}

export default AuthWrapper;
