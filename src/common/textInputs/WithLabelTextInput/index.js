// @flow
import React, { PureComponent } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import R from "res/R";
import WithLabel from "../../views/WithLabel";
import MentionTextInputContainer from "../../containers/MentionTextInputContainer";
import MentionTextInput from "../MentionTextInput";
import styles from "./styles";
import { withTheme } from "styled-components";
import CustomTextInput from "../CustomTextInput";
import { DescriptionText } from "../../themed";

class WithLabelTextInput extends PureComponent {
    _textInputRef: ?MentionTextInput = null;
    state = {
        limit: null,
        inputHeight: 32,
    };
    constructor(props) {
        super(props);
        const { maxLength, value } = props;
        if (maxLength) {
            const limit = maxLength - (value ? value.length : 0);
            this.state = { limit: Math.max(limit, 0) };
        }
    }
    _onChangeText = text => {
        const { maxLength, onChangeText } = this.props;
        if (maxLength) {
            const limit = maxLength - text.length;
            this.setState({
                limit: Math.max(limit, 0),
            });
        }
        if (onChangeText) {
            onChangeText(text);
        }
    };

    render() {
        const {
            label,
            style,
            onChangeText,
            onPress,
            disabled,
            isMention,
            onShowAutocomplete,
            theme,
            ...rest
        } = this.props;
        const { limit, inputHeight } = this.state;
        const paddingVertical = Platform.select({ ios: 10, android: 5 });
        const renderedTextInput = isMention ? (
            <>
                <MentionTextInput
                    onRef={ref => (this._textInputRef = ref)}
                    containerStyle={{
                        ...Platform.select({
                            ios: {},
                            android: {
                                bottom: 16,
                            },
                        }),
                        flexDirection: "column-reverse",
                    }}
                    listStyle={{
                        ...Platform.select({
                            ios: {
                                position: "absolute",
                                zIndex: 9999,
                                bottom: 0,
                            },
                            android: { zIndex: 9999 },
                        }),
                    }}
                    inputStyle={{
                        ...R.themedStyles(theme).textInput.border,
                        ...style,
                        paddingTop: paddingVertical,
                        paddingBottom: paddingVertical,
                        margin: 0,
                    }}
                    text={this.props.value}
                    onChangeText={this._onChangeText}
                    onShowResults={onShowAutocomplete}
                    TextInputContainer={MentionTextInputContainer}
                    {...rest}
                />
                <View
                    style={
                        Platform.OS === "ios"
                            ? { height: 0 }
                            : {
                                  height: inputHeight,
                              }
                    }
                />
            </>
        ) : (
            <CustomTextInput
                onChangeText={this._onChangeText}
                style={{
                    paddingTop: paddingVertical,
                    paddingBottom: paddingVertical,
                    ...R.themedStyles(theme).textInput.border,
                    ...style,
                    margin: 0,
                }}
                pointerEvents={onPress ? "none" : "auto"}
                {...rest}
            />
        );
        return (
            <WithLabel label={label}>
                {onPress ? (
                    <TouchableOpacity onPress={onPress} disabled={disabled}>
                        {renderedTextInput}
                    </TouchableOpacity>
                ) : (
                    renderedTextInput
                )}
                {limit !== undefined ? (
                    <DescriptionText style={styles.limit}>{limit}</DescriptionText>
                ) : null}
            </WithLabel>
        );
    }
}

WithLabelTextInput.defaultProps = {
    isMention: false,
    onShowAutocomplete: showed => {},
};

export default withTheme(WithLabelTextInput);
