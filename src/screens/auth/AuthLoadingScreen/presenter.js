import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { ContainerWrap } from "./styles";

class AuthLoadingScreen extends Component {
    // Render any loading content that you like here
    render() {
        return (
            <ContainerWrap>
                <ActivityIndicator size='large' />
            </ContainerWrap>
        );
    }
}

export default AuthLoadingScreen;
