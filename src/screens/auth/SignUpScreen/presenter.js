import React, { Component } from "react";
import { Platform, Keyboard, Text } from "react-native";
import PropTypes from "prop-types";
import { Root } from "utils/navigation";
import formValidator from "utils/formValidator";
import NavigationService from "service/Navigation";
import withObservableStream from "observable/withObservableStream";
import userObservables from "observable/user";
import { AuthWrapper } from "common/containers";
import {
    Error,
    SignUpView,
    SubmitButton,
    Header,
    Title,
    AuthConditions,
    AuthAgreement,
    AuthText,
} from "./styles";
import { NavigationBar } from "common/views";
import { Input } from "common/textInputs";
import { ContainerView } from "common/themed";

class SignUpScreen extends Component<State> {
    state = {
        loading: false,
        name: "",
        nameError: "",
        username: "",
        usernameError: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
        isKeyboard: false,
    };

    componentDidMount() {
        const MIN_LENGTH = 3;
        const MAX_LENGTH = 30;
        const PASSWORD_MIN_LENGTH = 6;
        const PASSWORD_MAX_LENGTH = 40;

        setTimeout(() => this.nameInput.focus(), 300);

        this._setupObservables();

        this.validator = formValidator([
            {
                field: "name",
                method: "validName",
                message: "Please enter a valid name.",
            },
            {
                field: "name",
                method: "isLength",
                args: [{ min: MIN_LENGTH, max: MAX_LENGTH }],
                message: `Name must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters long.`,
            },
            {
                field: "username",
                method: "validUsername",
                message: "Please enter a valid username.",
            },
            {
                field: "username",
                method: "isLength",
                args: [{ min: MIN_LENGTH, max: MAX_LENGTH }],
                message: `Username must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters long.`,
            },
            {
                field: "email",
                method: "isEmail",
                message: "Please enter a valid email address.",
            },
            {
                field: "password",
                method: "isLength",
                args: [{ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH }],
                message: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters long.`,
            },
        ]);

        this.keyboardShowListener = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
            () => {
                this.setState({ isKeyboard: true });
            },
        );
        this.keyboardHideListener = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
            () => {
                this.setState({ isKeyboard: false });
            },
        );
    }

    componentWillUnmount(): void {
        const { clearSubscriptions } = this.props;

        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
        clearSubscriptions();
    }

    _setupObservables = () => {
        const { subscriptions } = this.props;

        subscriptions.push(
            userObservables.subjects.signUpSubject$.subscribe(status => {
                this._handleLoading(status === userObservables.constants.LOADING);
                if (status === userObservables.constants.SUCCESS) {
                    NavigationService.navigate(Root.Interests);
                }
            }),
        );
    };

    _handleLoading = isLoading => {
        this.setState({ loading: isLoading });
    };

    _onPressSignUp = () => {
        const { name, username, email, password } = this.state;
        const errors = this.validator({ name, username, email, password });
        const formatErrors = errors =>
            errors.reduce((a, e) => {
                a[`${e.field}Error`] = e.message;
                return a;
            }, {});

        if (errors.length) {
            this.setState({
                nameError: "",
                usernameError: "",
                emailError: "",
                passwordError: "",
                ...formatErrors(errors),
            });
        } else {
            this.props.signUpRequest({ name, username, email, password });
        }
    };

    _canSubmit = () => {
        const { name, username, email, password } = this.state;
        return name.length > 0 && username.length > 0 && email.length > 0 && password.length > 0;
    };

    render() {
        const {
            loading,
            name,
            username,
            email,
            password,
            nameError,
            usernameError,
            emailError,
            passwordError,
        } = this.state;
        return (
            <ContainerView>
                <NavigationBar hasBackButton={true} handleLeft={NavigationService.back} />
                <AuthWrapper>
                    <SignUpView>
                        <Header>
                            <Title>Create your account</Title>
                        </Header>
                        <Input
                            ref={input => {
                                this.nameInput = input;
                            }}
                            placeholder='Name'
                            type={"name"}
                            editable={!loading}
                            onChangeText={name => this.setState({ name })}
                            clearInput={() => this.setState({ name: "" })}
                            value={name}
                            returnKeyType='next'
                        />
                        {!!nameError && <Error>{nameError}</Error>}
                        <Input
                            placeholder='Username'
                            type={"username"}
                            editable={!loading}
                            onChangeText={username => this.setState({ username })}
                            clearInput={() => this.setState({ username: "" })}
                            value={username}
                            returnKeyType='next'
                        />
                        {!!usernameError && <Error>{usernameError}</Error>}
                        <Input
                            placeholder='Email'
                            type={"email"}
                            editable={!loading}
                            onChangeText={email => this.setState({ email })}
                            clearInput={() => this.setState({ email: "" })}
                            value={email}
                            returnKeyType='next'
                        />
                        {!!emailError && <Error>{emailError}</Error>}
                        <Input
                            placeholder='Password'
                            type={"password"}
                            editable={!loading}
                            onChangeText={password => this.setState({ password })}
                            clearInput={() => this.setState({ password: "" })}
                            value={password}
                            returnKeyType='next'
                        />
                        {!!passwordError && <Error>{passwordError}</Error>}
                        <SubmitButton
                            label='Next'
                            onPress={this._onPressSignUp}
                            isLoading={loading}
                            disabled={!this._canSubmit()}
                            size='large'
                        />
                        <AuthConditions>
                            <AuthAgreement>
                                By signing up, you agree to the
                                <Text> </Text>
                                <AuthText onPress={() => NavigationService.navigate("Terms")}>
                                    Terms
                                </AuthText>
                                <Text> </Text>
                                and
                                <Text> </Text>
                                <AuthText onPress={() => NavigationService.navigate("Privacy")}>
                                    Privacy
                                </AuthText>
                                .
                            </AuthAgreement>
                            <AuthAgreement>
                                If you are under 13 years of age, you may not use or become a member
                                of AllSocial.
                            </AuthAgreement>
                        </AuthConditions>
                    </SignUpView>
                </AuthWrapper>
            </ContainerView>
        );
    }
}

SignUpScreen.propTypes = {
    signUpRequest: PropTypes.func,
    subscriptions: PropTypes.array,
};

export default withObservableStream({})(SignUpScreen);
