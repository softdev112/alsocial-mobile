// @flow
import React, { Component } from "react";
import { Text, View } from "react-native";

import { TermsOfServiceWrapper } from "common/views";
import R from "res/R";
import styles from "./styles";
import { Content, Title } from "common/themed";

class PrivacyScreen extends Component {
    renderBulletText = (text: string, index: number) => (
        <View style={styles.rowBullet} key={`${index}`}>
            <Content>{"\u2022"}</Content>
            <Content style={styles.contentTextBullet}>{text}</Content>
        </View>
    );
    renderOrderedText = (text: string, index: number) => (
        <View style={styles.rowBullet} key={`${index}`}>
            <Content style={styles.contentTextOrder}>{`${index + 1}.`}</Content>
            <Content>{text}</Content>
        </View>
    );
    render() {
        return (
            <TermsOfServiceWrapper
                header={R.strings.privacy.header}
                footer={R.strings.privacy.footer}
            >
                <Title>{R.strings.privacy.description}</Title>
                <Title>
                    {"\n"}Contents{"\n"}
                </Title>
                {R.strings.privacy.contents.map((item, index) =>
                    this.renderOrderedText(item.title, index),
                )}
                <Content>
                    {"\n"}
                    {R.strings.privacy.contentText}
                </Content>
                {R.strings.privacy.contents.map((item, index) => (
                    <View key={index} style={styles.content}>
                        <View>
                            <Title>{`${index + 1}. ${item.title}\n`}</Title>
                            <Content>{item.content}</Content>
                            {item.subTitle && <Title>{`\n\n${item.subTitle}\n`}</Title>}
                            {item.subContent && <Content>{item.subContent}</Content>}
                        </View>
                        {item.subContents &&
                            item.subContents.map((text, subIndex) =>
                                this.renderBulletText(text, subIndex),
                            )}
                        {item.content2 && <Content>{item.content2}</Content>}
                    </View>
                ))}
                {R.strings.privacy.others.map((item, index) => (
                    <View key={index} style={styles.content}>
                        <Text>
                            <Title>{`${item.title}\n`}</Title>
                            <Content>{item.content}</Content>
                        </Text>
                    </View>
                ))}
            </TermsOfServiceWrapper>
        );
    }
}

export default PrivacyScreen;
