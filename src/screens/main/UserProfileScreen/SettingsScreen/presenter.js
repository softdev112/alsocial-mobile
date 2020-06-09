// @flow
import React, { Component } from "react";
import { View, FlatList, Alert } from "react-native";
import { NavigationBar, SettingsRow } from "common/views";
import R from "res/R";
import styles from "./styles";
import { Auth, Main } from "utils/navigation";
import NavigationService from "service/Navigation";
import { AppVersion } from "common/labels";
import { AboutIcon, TermsIcon, PrivacyIcon, InviteFriends, LogoutIcon } from "res/icons";
import { ContainerView, ContentView } from "common/themed";
import { withBottomSheet } from "components/BottomSheet";

const settings = [
    {
        id: "1",
        icon: null,
        title: R.strings.settings.account,
        onPress: () => NavigationService.navigate(Main.Account),
    },
    {
        id: "2",
        icon: null,
        title: "Notifications",
        onPress: () => NavigationService.navigate(Main.Notifications),
    },
    {
        id: "3",
        icon: <InviteFriends />,
        title: R.strings.settings.inviteFriends,
        onPress: null,
    },
    {
        id: "4",
        icon: <AboutIcon />,
        title: R.strings.settings.display,
        onPress: () => NavigationService.navigate(Main.Display),
    },
    {
        id: "5",
        icon: <AboutIcon />,
        title: R.strings.settings.about,
        onPress: () => NavigationService.navigate(Auth.About),
    },
    {
        id: "6",
        icon: <TermsIcon />,
        title: R.strings.settings.terms,
        onPress: () => NavigationService.navigate(Auth.Terms),
    },
    {
        id: "7",
        icon: <PrivacyIcon />,
        title: R.strings.settings.privacy,
        onPress: () => NavigationService.navigate(Auth.Privacy),
    },
    {
        id: "8",
        icon: <TermsIcon />,
        title: R.strings.settings.license,
        onPress: () => NavigationService.navigate(Auth.License),
    },
    { id: "9", icon: <LogoutIcon />, title: R.strings.settings.signOut },
];

class SettingsScreen extends Component {
    _inviteFriends = () => {
        const { inviteFriends, showBottomSheet } = this.props;
        inviteFriends({ showBottomSheet });
    };

    _renderItem = ({ item, index }) => {
        const { id, icon, title, onPress } = item;
        return (
            <SettingsRow
                keyValue={`settings-${id}-${index}`}
                title={title}
                onPress={() => {
                    if (id === "3") {
                        this._inviteFriends();
                    } else if (id === "9") {
                        Alert.alert("Are you sure you want to log out?", null, [
                            { text: "Cancel", onPress: () => {}, style: "cancel" },
                            { text: "Yes", onPress: this.props.logOut },
                        ]);
                    } else {
                        onPress();
                    }
                }}
            />
        );
    };
    render() {
        return (
            <ContainerView>
                <ContentView style={{ justifyContent: "space-between" }}>
                    <NavigationBar title={"Settings"} hasBackButton={true} />
                    <View style={styles.flex}>
                        <FlatList
                            style={styles.flex}
                            keyExtractor={item => item.id}
                            data={settings}
                            renderItem={this._renderItem}
                        />
                    </View>
                    <View style={styles.appVersion}>
                        <AppVersion />
                    </View>
                </ContentView>
            </ContainerView>
        );
    }
}

// export default SettingsScreen;
export default withBottomSheet(SettingsScreen);
