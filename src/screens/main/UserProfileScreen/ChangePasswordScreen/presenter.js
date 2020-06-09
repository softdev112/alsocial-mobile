import React, { Component } from "react";
import { ScrollView, View, KeyboardAvoidingView } from "react-native";
import { NavigationBar } from "common/views";
import { WithLabelTextInput } from "common/textInputs";
import withObservableStream from "observable/withObservableStream";
import userObservables from "observable/user";
import R from "res/R";
import styles from "./styles";
import { ContainerView } from "common/themed";

const account = R.strings.account;

class ChangePasswordScreen extends Component {
    state = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        isLoading: false,
    };

    componentDidMount(): void {
        this._setupObservables();
    }

    componentWillUnmount(): void {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
    }

    _setupObservables = () => {
        const { subscriptions } = this.props;
        subscriptions.push(
            userObservables.subjects.changePasswordSubject$.subscribe(status => {
                this.setState({ isLoading: status === userObservables.constants.LOADING });
            }),
        );
    };

    _saveNewPassword = () => {
        const { newPasswordRequest } = this.props;
        const { currentPassword, newPassword, confirmNewPassword } = this.state;
        newPasswordRequest({
            password: currentPassword,
            newPassword,
            confirmNewPassword,
        });
    };

    _canSave = () => {
        const { currentPassword, newPassword, confirmNewPassword } = this.state;
        return (
            currentPassword.length > 0 && newPassword.length > 0 && confirmNewPassword.length > 0
        );
    };
    // Render any loading content that you like here
    render() {
        const { currentPassword, newPassword, confirmNewPassword, isLoading } = this.state;
        return (
            <ContainerView>
                <NavigationBar
                    title={R.strings.account.changePassword}
                    hasBackButton={true}
                    rightButtonText={R.strings.account.save}
                    handleRight={this._saveNewPassword}
                    disabled={!this._canSave()}
                    isLoading={isLoading}
                />
                <KeyboardAvoidingView style={styles.flex}>
                    <ScrollView style={styles.flex}>
                        <View style={styles.container}>
                            <WithLabelTextInput
                                label={account.currentPassword}
                                type={"password"}
                                value={currentPassword}
                                onChangeText={text => this.setState({ currentPassword: text })}
                            />
                            <View style={styles.largeSpace} />
                            <WithLabelTextInput
                                label={account.newPassword}
                                type={"password"}
                                value={newPassword}
                                onChangeText={text => this.setState({ newPassword: text })}
                            />
                            <View style={styles.space} />
                            <WithLabelTextInput
                                label={account.confirmNewPassword}
                                type={"password"}
                                value={confirmNewPassword}
                                onChangeText={text => this.setState({ confirmNewPassword: text })}
                            />
                            <View style={styles.largeSpace} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ContainerView>
        );
    }
}

export default withObservableStream({})(ChangePasswordScreen);
