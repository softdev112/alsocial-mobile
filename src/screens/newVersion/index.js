import React, { Component } from "react";
import { Linking, Text, View, Platform } from "react-native";
import styles from "./styles";
import { Button } from "common/buttons";
import R from "res/R";
import { ContainerView, BoldText } from "common/themed";

class NewVersionScreen extends Component {
    _handlePress = () => {
        if (Platform.OS === "ios") {
            Linking.openURL("itms-apps://itunes.apple.com/app/apple-store/id1450671477?mt=8");
        } else {
            Linking.openURL("market://details?id=com.allsocial.app");
        }
    };
    render() {
        return (
            <ContainerView style={styles.container}>
                <BoldText style={styles.description}>{R.strings.newVersion}</BoldText>
                <Button
                    label={Platform.select({
                        ios: "Go to App Store",
                        android: "Go to Google Play",
                    })}
                    onPress={this._handlePress}
                    size='large'
                />
            </ContainerView>
        );
    }
}

export default NewVersionScreen;
