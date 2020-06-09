import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Main } from "utils/navigation";
import { Button } from "common/buttons";
import {
    AuthView,
    LogoImage,
    TagLineView,
    TagLine,
    ShapeRect,
    ShapeSide,
    ShapeDiag,
    ButtonsView,
} from "./styles";
import NavigationService from "service/Navigation";
import R from "res/R";
import { ContainerView } from "common/themed";
import { NavigationEvents } from "react-navigation";

type State = {
    formType: Number,
    loading: boolean,
};

class AuthScreen extends Component<State> {
    componentDidMount(): void {
        const { setAppAuthStatus } = this.props;
        setAppAuthStatus();
    }

    _willFocus = payload => {
        const { setAppLightMode } = this.props;
        setAppLightMode(true);
    };

    _willBlur = payload => {
        const { setAppLightMode } = this.props;
        setAppLightMode(false);
    };

    render() {
        const theme = R.theme("light");
        return (
            <ContainerView style={{ backgroundColor: theme.color.background }}>
                <NavigationEvents onWillFocus={this._willFocus} onWillBlur={this._willBlur} />
                <ScrollView style={{ flex: 1 }}>
                    <AuthView>
                        <LogoImage mode={"light"} height={50} width={90} />
                        <TagLineView>
                            <TagLine>
                                Discover exciting stories, topics you love, new friends and more.
                            </TagLine>
                            <ShapeRect />
                            <ShapeSide />
                            <ShapeDiag />
                        </TagLineView>
                        <ButtonsView>
                            <Button
                                label={R.strings.auth.button_sign_up}
                                onPress={() => NavigationService.navigate(Main.SignUp)}
                                size='large'
                            />
                            <Button
                                label={R.strings.auth.button_login}
                                onPress={() => NavigationService.navigate(Main.Login)}
                                style={{ marginTop: 15 }}
                                size='large'
                                type='outline'
                                textColor={theme.color.text}
                                borderColor={theme.color.lightGrey}
                            />
                        </ButtonsView>
                    </AuthView>
                </ScrollView>
            </ContainerView>
        );
    }
}

export default AuthScreen;
