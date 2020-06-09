import React, { Component } from "react";
import { View } from "react-native";
import { NavigationBar } from "common/views";
import R from "res/R";
import styles from "./styles";
import { ContainerView } from "common/themed";
import { ThemePicker } from "common/picker";

class DisplayScreen extends Component {
    // Render any loading content that you like here
    render() {
        return (
            <ContainerView>
                <NavigationBar title={R.strings.settings.display} hasBackButton={true} />
                <View style={styles.container}>
                    <ThemePicker />
                </View>
            </ContainerView>
        );
    }
}

export default DisplayScreen;
