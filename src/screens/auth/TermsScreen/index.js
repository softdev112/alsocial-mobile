// @flow
import React, { Component } from "react";
import { Text, View, Linking } from "react-native";

import { TermsOfServiceWrapper } from "common/views";
import R from "res/R";
import styles from "./styles";
import { TealText, Title, Content } from "common/themed";

class TermsScreen extends Component {
    render() {
        return (
            <TermsOfServiceWrapper header={R.strings.terms.header} footer={R.strings.terms.footer}>
                <Title>{R.strings.terms.description}</Title>
                {R.strings.terms.contents.map((item, index) => (
                    <View key={index} style={styles.content}>
                        <Title>{`${item.title}\n`}</Title>
                        <Text>
                            <Content>{item.text}</Content>
                            {item.email && (
                                <TealText onPress={() => Linking.openURL(`mailto:${item.email}`)}>
                                    {item.email}
                                </TealText>
                            )}
                            {item.text2 && <Content>{item.text2}</Content>}
                        </Text>
                    </View>
                ))}
            </TermsOfServiceWrapper>
        );
    }
}

export default TermsScreen;
