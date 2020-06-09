import React, { Component } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import R from "res/R";
import PropTypes from "prop-types";
import { StatusBar } from "react-native";
import Orientation from "react-native-orientation-locker";
import withObservableStream from "observable/withObservableStream";
import { changedFullscreenSubject$ } from "observable/video";
import { ContainerView } from "../../themed";
import { Root } from "utils/navigation";

class ThemeProvider extends Component {
    state = {
        isFullscreen: false,
    };

    componentDidMount() {
        this._setupObservables();
        Orientation.lockToPortrait();
        const { mode, setAppThemeMode } = this.props;
        if (!mode || (mode !== "light" && mode !== "dim" && mode !== "dark")) {
            setAppThemeMode("light");
        }
    }

    componentWillUnmount() {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
        Orientation.unlockAllOrientations();
    }

    _setupObservables = () => {
        const { subscriptions } = this.props;
        subscriptions.push(
            changedFullscreenSubject$.subscribe(isFullscreen => {
                this.setState({ isFullscreen });
                StatusBar.setHidden(isFullscreen);
            }),
        );
    };

    render() {
        const { mode, isLightMode, children, currentStatus } = this.props;
        const { isFullscreen } = this.state;
        const value = currentStatus === Root.MainStack && !isLightMode && mode ? mode : "light";
        const barStyle = value !== "light" ? "light-content" : "dark-content";
        const currentTheme = R.theme(value);
        return (
            <StyledThemeProvider theme={currentTheme}>
                <ContainerView isFullscreen={isFullscreen}>
                    <StatusBar
                        backgroundColor={currentTheme.color.background}
                        barStyle={barStyle}
                    />
                    {children}
                </ContainerView>
            </StyledThemeProvider>
        );
    }
}

ThemeProvider.propTypes = {
    mode: PropTypes.string,
};

export default withObservableStream({})(ThemeProvider);
