import { createStackNavigator } from "react-navigation-stack";
import AuthScreen from "../auth/AuthScreen";
import ResetPasswordScreen from "../auth/ResetPasswordScreen";
import AboutScreen from "../auth/AboutScreen";
import TermsScreen from "../auth/TermsScreen";
import PrivacyScreen from "../auth/PrivacyScreen";
import SignUpScreen from "../auth/SignUpScreen";
import LoginScreen from "../auth/LoginScreen";
import LicenseScreen from "../auth/LicenseScreen";
import NewPasswordScreen from "../auth/NewPasswordScreen";
import transitionConfig from "./transitionConfig";

const AuthStack = createStackNavigator(
    {
        Auth: { screen: AuthScreen },
        SignUp: { screen: SignUpScreen },
        Login: { screen: LoginScreen },
        ResetPassword: { screen: ResetPasswordScreen },
        NewPassword: { screen: NewPasswordScreen },
        About: { screen: AboutScreen },
        Terms: { screen: TermsScreen },
        Privacy: { screen: PrivacyScreen },
        License: { screen: LicenseScreen },
    },
    {
        initialRouteName: "Auth",
        headerMode: "none",
        transitionConfig,
    },
);

export default AuthStack;
