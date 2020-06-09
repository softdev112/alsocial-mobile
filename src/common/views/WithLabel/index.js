// @flow
import React, { PureComponent } from "react";
import { View } from "react-native";
import styles from "./styles";
import { DescriptionText } from "../../themed";

class WithLabel extends PureComponent {
    render() {
        const { label, children } = this.props;
        return (
            <View style={styles.container}>
                <DescriptionText>{label}</DescriptionText>
                {children}
            </View>
        );
    }
}

export default WithLabel;
