import React, { Component } from "react";
import withObservableStream from "observable/withObservableStream";
import userObservables from "observable/user";
import { SafeAreaView } from "react-native";
import { FormView, SubmitView, SubmitButton, Header, Title, Description } from "./styles";
import NavigationService from "service/Navigation";
import { AuthWrapper } from "common/containers";
import { NavigationBar } from "common/views";
import { Input } from "common/textInputs";
import R from "res/R";
import { ContainerView } from "common/themed";

class NewPasswordScreen extends Component {
    state = {
        isLoading: false,
        password: "",
        confirmPassword: "",
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
            userObservables.subjects.newPasswordSubject$.subscribe(status => {
                this.setState({ isLoading: status === userObservables.constants.LOADING });
            }),
        );
    };

    _resetPassword = () => {
        const { resetPasswordRequest } = this.props;
        const { password, confirmPassword } = this.state;
        resetPasswordRequest({ password, confirmPassword });
    };

    _canSubmit = () => {
        const { password, confirmPassword } = this.state;
        return password.length > 0 && confirmPassword.length > 0;
    };

    render() {
        const { isLoading } = this.state;
        return (
            <ContainerView>
                <NavigationBar hasBackButton={true} handleLeft={NavigationService.back} />
                <AuthWrapper>
                    <FormView>
                        <Header>
                            <Title>{R.strings.auth.newPassword.title}</Title>
                            <Description>{R.strings.auth.newPassword.description}</Description>
                        </Header>
                        <Input
                            placeholder={R.strings.auth.password}
                            type={"password"}
                            editable={!isLoading}
                            onChangeText={text => this.setState({ password: text })}
                            value={this.state.password}
                            autoFocus
                        />
                        <Input
                            placeholder={R.strings.auth.confirmPassword}
                            type={"password"}
                            editable={!isLoading}
                            onChangeText={text => this.setState({ confirmPassword: text })}
                            value={this.state.confirmPassword}
                            autoFocus
                        />
                        <SubmitView>
                            <SubmitButton
                                label={R.strings.auth.button_reset_password}
                                onPress={this._resetPassword}
                                isLoading={isLoading}
                                disabled={!this._canSubmit()}
                                size='large'
                            />
                        </SubmitView>
                    </FormView>
                </AuthWrapper>
            </ContainerView>
        );
    }
}

export default withObservableStream({})(NewPasswordScreen);
