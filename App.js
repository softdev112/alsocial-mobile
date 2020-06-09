/**
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { AppState, Platform } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import codePush from "react-native-code-push";
import branch from "react-native-branch";

import RootStack from "./src/screens/Navigator";
import NavigationService from "service/Navigation";
import storageConfig from "./src/redux/Store";
import { changeAppState } from "modules/app/actions";
import BranchProvider, { BranchConsumer } from "./src/context/BranchContext";
import { branchNavigation } from "./src/utils/branch";
import { ThemeProvider } from "common/containers";
import { BottomSheetProvider } from "components/BottomSheet";

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_SUSPEND,
    minimumBackgroundDuration: 0, // seconds the app is in the background before the update will be installed
};
export const { store, persistor } = storageConfig();

class App extends Component {
    state = {
        appState: AppState.currentState,
    };
    componentDidMount() {
        AppState.addEventListener("change", this._handleAppStateChange);

        branch.subscribe(async ({ error, params }) => {
            if (error) return;
            await this.props.setParams(params);

            const { userState } = await store.getState();
            const userToken = userState.token || null;

            if (!this.props.params.navigated) {
                if (Platform.OS === "android") {
                    const linkData = await branch.getLatestReferringParams(true);
                    await this.props.setParams(linkData);

                    if (userToken && this.props.params.navigated === "false") {
                        await this.props.setParams({ ...this.props.params, navigated: "true" });
                        return branchNavigation(this.props.params);
                    }
                }
            }

            if (userToken && this.props.params.navigated === "false") {
                await this.props.setParams({ ...this.props.params, navigated: "true" });
                return branchNavigation(this.props.params);
            }
        });
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
    }

    _handleSetNavigationReference = async ref => {
        await NavigationService.setTopLevelNavigator(ref);
    };

    _handleAppStateChange = nextAppState => {
        if (this.state.appState !== nextAppState) {
            store.dispatch(changeAppState(nextAppState !== "active"));
            this.setState({ appState: nextAppState });
        }
    };

    render() {
        console.disableYellowBox = true;
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ThemeProvider>
                        <BottomSheetProvider>
                            <RootStack ref={this._handleSetNavigationReference} />
                        </BottomSheetProvider>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        );
    }
}

let ContextApp = props => (
    <BranchProvider>
        <BranchConsumer>
            {({ params, setParams }) => <App {...props} params={params} setParams={setParams} />}
        </BranchConsumer>
    </BranchProvider>
);

ContextApp = codePush(codePushOptions)(ContextApp);

export default ContextApp;
