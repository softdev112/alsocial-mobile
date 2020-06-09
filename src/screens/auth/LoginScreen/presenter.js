import React, { Component } from "react";
import PropTypes from "prop-types";
import NavigationService from "service/Navigation";
import withObservableStream from "observable/withObservableStream";
import userObservables from "observable/user";

import {
    Error,
    LoginView,
    LoginForm,
    SubmitView,
    SubmitButton,
    ForgotPassword,
    ForgotPasswordText,
    Header,
    Title,
} from "./styles";

import R from "res/R";

import { AuthWrapper } from "common/containers";
import { NavigationBar } from "common/views";
import { Input } from "common/textInputs";
import { ContainerView } from "common/themed";

class LoginScreen extends Component<State> {
    state = {
        loading: false,
        credentials: "",
        password: "",
        credentialsError: "",
        passwordError: "",
    };

    componentDidMount(): void {
        setTimeout(() => this.phoneEmailUsernameInput.focus(), 300);
        this._setupObservables();
    }

    componentWillUnmount(): void {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
    }

    _setupObservables = () => {
        const { subscriptions, validToken } = this.props;
        subscriptions.push(
            userObservables.subjects.loginSubject$.subscribe(status => {
                this._handleLoading(status === userObservables.constants.LOADING);
                if (status === userObservables.constants.SUCCESS) {
                    validToken();
                }
            }),
        );
    };

    _handleLoading = isLoading => {
        this.setState({ loading: isLoading });
    };

    _onPressLogin = () => {
        const { credentials, password } = this.state;
        this.props.login({ credentials, password });
    };

    _canSubmit = () => {
        const { credentials, password } = this.state;
        return credentials.length > 0 && password.length > 0;
    };

    render() {
        const { loading, credentials, password, credentialsError, passwordError } = this.state;
        return (
            <ContainerView>
                <NavigationBar hasBackButton={true} handleLeft={NavigationService.back} />
                <AuthWrapper>
                    <LoginView>
                        <LoginForm>
                            <Header>
                                <Title>Log in to AllSocial</Title>
                            </Header>
                            <Input
                                placeholder={R.strings.auth.phoneEmailUsername}
                                ref={input => {
                                    this.phoneEmailUsernameInput = input;
                                }}
                                type={"email"}
                                editable={!loading}
                                onChangeText={credentials => this.setState({ credentials })}
                                value={credentials}
                                returnKeyType='next'
                                clearInput={() => this.setState({ credentials: "" })}
                            />
                            {!!credentialsError && <Error>{credentialsError}</Error>}
                            <Input
                                placeholder={R.strings.auth.password}
                                type={"password"}
                                editable={!loading}
                                onChangeText={password => this.setState({ password })}
                                value={password}
                                clearInput={() => this.setState({ password: "" })}
                            />
                            {!!passwordError && <Error>{passwordError}</Error>}
                            <SubmitView>
                                <ForgotPassword
                                    onPress={() => NavigationService.navigate("ResetPassword")}
                                >
                                    <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
                                </ForgotPassword>
                                <SubmitButton
                                    label='Log in'
                                    onPress={this._onPressLogin}
                                    isLoading={loading}
                                    disabled={!this._canSubmit()}
                                    size='large'
                                />
                            </SubmitView>
                        </LoginForm>
                    </LoginView>
                </AuthWrapper>
            </ContainerView>
        );
    }
}

LoginScreen.propTypes = {
    login: PropTypes.func,
    validToken: PropTypes.func,
    subscriptions: PropTypes.array,
};

export default withObservableStream({})(LoginScreen);
