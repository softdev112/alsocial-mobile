import React, { Component } from "react";
import { ScrollView, View, Switch, KeyboardAvoidingView, Alert } from "react-native";
import { NavigationBar } from "common/views";
import { ContainerView, NormalText, DescriptionText } from "common/themed";
import { WithLabelTextInput } from "common/textInputs";
import { Button } from "common/buttons";
import NavigationService from "service/Navigation";
import { Main } from "utils/navigation";
import R from "res/R";
import styles from "./styles";
import withObservableStream from "observable/withObservableStream";
import userObservables from "observable/user";

const account = R.strings.account;

class AccountScreen extends Component {
    constructor(props) {
        super(props);
        const { user } = props;
        this.state = {
            email: user.email,
            username: user.username,
            // phone: user.phone,
            isPublic: user.isPublic,
            isLoading: false,
            isDeleting: false,
        };
    }

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
            userObservables.subjects.updateAccountSubject$.subscribe(status => {
                this.setState({ isLoading: status === userObservables.constants.LOADING });
                if (status === userObservables.constants.SUCCESS) {
                    NavigationService.back();
                }
            }),
        );

        subscriptions.push(
            userObservables.subjects.deleteAccountSubject$.subscribe(status => {
                this.setState({ isDeleting: status === userObservables.constants.LOADING });
            }),
        );
    };

    _saveAccountSettings = () => {
        const { isLoading, isDeleting, ...rest } = this.state;
        const { updateAccount } = this.props;
        updateAccount(rest);
    };

    _onDeleteAccount = () => {
        const { deleteAccount } = this.props;
        Alert.alert(
            "Delete User",
            "Are you sure you want to delete your account?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => deleteAccount(), style: "destructive" },
            ],
            { cancelable: false },
        );
    };

    _onChangePublic = value => {
        this.setState({ isPublic: !value });
    };
    // Render any loading content that you like here
    render() {
        const { email, username, isPublic, isLoading, isDeleting } = this.state;
        return (
            <ContainerView>
                <NavigationBar
                    title={R.strings.settings.account}
                    hasBackButton={true}
                    rightButtonText={"Save"}
                    handleRight={this._saveAccountSettings}
                    disabled={isDeleting}
                    isLoading={isLoading}
                />
                <KeyboardAvoidingView style={styles.flex}>
                    <ScrollView style={styles.flex}>
                        <View style={styles.container} pointerEvents={isDeleting ? "none" : "auto"}>
                            <WithLabelTextInput
                                label={account.email}
                                placeholder={account.email}
                                type={"email"}
                                onChangeText={text => this.setState({ email: text })}
                                style={{ marginTop: 5 }}
                                editable={!isLoading || !isDeleting}
                                value={email}
                            />
                            <WithLabelTextInput
                                label={account.username}
                                placeholder={account.username}
                                onChangeText={text => this.setState({ username: text })}
                                style={{ marginTop: 5 }}
                                editable={!isLoading || !isDeleting}
                                value={username}
                            />
                            {/*
                            <WithLabelTextInput
                                label={account.phone}
                                placeholder={account.phone}
                                type={"number"}
                                onChangeText={text => this.setState({ phone: text })}
                                style={{ marginTop: 5 }}
                                editable={!isLoading || !isDeleting}
                                value={phone}
                            />
                            */}
                            <WithLabelTextInput
                                label={account.password}
                                placeholder={account.password}
                                type={"password"}
                                editable={false}
                                onChangeText={text => this.setState({ password: text })}
                                onPress={() => NavigationService.push(Main.ChangePassword)}
                                style={{ marginTop: 5 }}
                                value={"password"}
                            />
                            <View style={styles.privateContainer}>
                                <NormalText>{account.privateProfile}</NormalText>
                                <Switch
                                    disabled={isLoading || isDeleting}
                                    onValueChange={this._onChangePublic}
                                    value={!isPublic}
                                />
                            </View>
                            <View style={styles.space} />
                            <DescriptionText>{account.privateDescription}</DescriptionText>
                            <View style={styles.largeSpace} />
                            <Button
                                label={R.strings.account.deleteAccount}
                                onPress={this._onDeleteAccount}
                                disabled={isLoading}
                                isLoading={isDeleting}
                                type={"outline"}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ContainerView>
        );
    }
}

export default withObservableStream({})(AccountScreen);
