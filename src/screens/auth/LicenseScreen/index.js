// @flow
import React, { Component } from "react";
import { View, Linking } from "react-native";

import { TermsOfServiceWrapper } from "common/views";
import R from "res/R";
import styles from "./styles";
import { Content, TealText } from "common/themed";

class LicenseScreen extends Component {
    renderOrderedText = (text: any, index: number) => (
        <View style={styles.rowBullet} key={`${index}`}>
            <Content style={styles.contentTextOrder}>{`${index + 1}.`}</Content>
            <Content>
                {text}
                {"\n"}
            </Content>
        </View>
    );
    render() {
        return (
            <TermsOfServiceWrapper
                header={R.strings.license.header}
                footer={R.strings.license.footer}
            >
                <Content>
                    {"\n"}
                    {R.strings.license.contentText}
                    {"\n\n"}
                </Content>
                {R.strings.license.contents.map((item, index) => {
                    let text = item;
                    if (index === 0) {
                        text = (
                            <Content>
                                {`${item[0]} `}
                                <TealText onPress={() => Linking.openURL(item[1])}>
                                    {item[1]}
                                </TealText>
                                {` ${item[2]}`}
                            </Content>
                        );
                    }
                    return this.renderOrderedText(text, index);
                })}
                {R.strings.license.others.map((item, index) => (
                    <Content key={index}>
                        {"\n"}
                        {item}
                    </Content>
                ))}
            </TermsOfServiceWrapper>
        );
    }
}

export default LicenseScreen;
