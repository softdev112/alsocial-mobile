import React, { Component } from "react";
import { Alert, Linking, Switch } from "react-native";

import { NavigationBar } from "common/views";
import { ContainerView, BoldText } from "common/themed";
import strings from "res/strings";

import { StyledSafeAreaView, StyledContainerView, PrivateContainerView } from "./styles";

class NotificationsSettingScreen extends Component {
    constructor(props) {
        super(props);
    }

    handleDeniedPermissions = () => {
        const message =
            "Enable Notifications in Settings to allow AllSocial to send Push Notifications";
        Alert.alert("Access is denied", message, [
            {
                text: "Cancel",
                style: "cancel",
            },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]);
    };

    render = () => {
        const { brazeStatus, disableBraze, enableBraze, pushNotificationStatus } = this.props;
        return (
            <StyledSafeAreaView>
                <NavigationBar
                    title={strings.notificationsSettingsScreen.header}
                    hasBackButton={true}
                />
                <ContainerView>
                    <StyledContainerView>
                        <PrivateContainerView>
                            <BoldText>{strings.notificationsSettingsScreen.switchText}</BoldText>
                            <Switch
                                onValueChange={val =>
                                    val
                                        ? pushNotificationStatus
                                            ? enableBraze()
                                            : this.handleDeniedPermissions()
                                        : disableBraze()
                                }
                                value={pushNotificationStatus && brazeStatus}
                            />
                        </PrivateContainerView>
                    </StyledContainerView>
                </ContainerView>
            </StyledSafeAreaView>
        );
    };
}

export default NotificationsSettingScreen;
