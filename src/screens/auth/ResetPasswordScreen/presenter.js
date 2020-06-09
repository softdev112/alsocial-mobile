import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import withObservableStream from "observable/withObservableStream";
import userObservables from "observable/user";
import NavigationService from "service/Navigation";
import { NavigationBar } from "common/views";
import { ArrowIcon } from "res/icons";
import { Input } from "common/textInputs";
import R from "res/R";
import { Wrapper, FormView, SubmitView, SubmitButton, Header, Title, Description } from "./styles";
import { ContainerView } from "common/themed";
import { AuthWrapper } from "common/containers";

class ResetPasswordScreen extends Component {
    state = {
        isLoading: false,
        email: "",
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
            userObservables.subjects.resetPasswordSubject$.subscribe(status => {
                this.setState({ isLoading: status === userObservables.constants.LOADING });
            }),
        );
    };

    _resetPassword = () => {
        const { resetPasswordRequest } = this.props;
        const { email } = this.state;
        resetPasswordRequest({ email });
    };

    _canSubmit = () => {
        const { email } = this.state;
        return email.length > 0;
    };

    render() {
        const { isLoading } = this.state;
        return (
            <ContainerView>
                <NavigationBar hasBackButton={true} handleLeft={NavigationService.back} />
                <AuthWrapper>
                    <FormView>
                        <Header>
                            <Title>{R.strings.auth.resetPassword.title}</Title>
                            <Description>{R.strings.auth.resetPassword.description}</Description>
                        </Header>
                        <Input
                            placeholder={R.strings.auth.email}
                            type={"email"}
                            editable={!isLoading}
                            onChangeText={text => this.setState({ email: text })}
                            value={this.state.email}
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

export default withObservableStream({})(ResetPasswordScreen);
