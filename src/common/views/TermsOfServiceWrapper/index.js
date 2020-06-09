// @flow
import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import R from "res/R";
import NavigationBar from "../NavigationBar";
import TermsOfServiceHeader from "./Header";
import TermsOfServiceFooter from "./Footer";
import styles from "./styles";
import { ContainerView } from "../../themed";

type Props = {
    header: string,
    footer: string,
    showHeader: Boolean,
    containerStyle: Object,
    mode: string,
};

class TermsOfServiceWrapper extends Component<Props> {
    render() {
        const { header, footer, showHeader, containerStyle, children, mode } = this.props;
        const theme = mode ? R.theme(mode) : null;
        return (
            <ContainerView style={theme ? { backgroundColor: theme.color.background } : null}>
                <NavigationBar hasBackButton={true} title={header} mode={mode} />
                <ScrollView style={styles.flex}>
                    <View style={{ ...styles.contentContainer, ...containerStyle }}>
                        {showHeader ? <TermsOfServiceHeader header={header} /> : null}
                        {children}
                        <TermsOfServiceFooter footer={footer} theme={theme} />
                    </View>
                </ScrollView>
            </ContainerView>
        );
    }
}

TermsOfServiceWrapper.defaultProps = {
    showHeader: true,
    header: "",
    footer: "",
    containerStyle: {},
    mode: null,
};

export default TermsOfServiceWrapper;
