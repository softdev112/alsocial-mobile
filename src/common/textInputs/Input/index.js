// @flow
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import R from "res/R";

import { Root, Row, Input, Clear } from "./styles";
import { ClearIcon } from "res/icons";
import { withTheme } from "styled-components";

class CustomTextInput extends PureComponent {
    _textInputRef: ?TextInput = null;

    componentDidMount() {
        const { onRef } = this.props;
        if (onRef) {
            onRef(this);
        }
    }

    focus = () => {
        if (this._textInputRef) {
            this._textInputRef.focus();
        }
    };

    setInputType = () => {
        const { type } = this.props;
        switch (type) {
            case "name":
                return {
                    autoCorrect: false,
                    spellCheck: false,
                    keyboardType: "default",
                };
            case "username":
                return {
                    autoCorrect: false,
                    spellCheck: false,
                    keyboardType: "default",
                    autoCapitalize: "none",
                };
            case "email":
                return {
                    autoCorrect: false,
                    spellCheck: false,
                    keyboardType: "email-address",
                    autoCapitalize: "none",
                };
            case "password":
                return {
                    autoCorrect: false,
                    spellCheck: false,
                    keyboardType: "default",
                    autoCapitalize: "none",
                    secureTextEntry: true,
                };
            case "number":
                return { keyboardType: "numeric" };
            default:
                return {
                    autoCorrect: true,
                    spellCheck: true,
                    keyboardType: "default",
                };
        }
    };

    render() {
        const { style, value, clearInput, theme, ...rest } = this.props;
        const hasClear = !!value && !!clearInput;
        return (
            <Root>
                <Row>
                    <Input
                        ref={ref => (this._textInputRef = ref)}
                        {...this.setInputType()}
                        style={{
                            ...R.themedStyles(theme).textInput.normal,
                            ...style,
                        }}
                        placeholderTextColor={theme.color.dark}
                        value={value}
                        hasClear={hasClear}
                        {...rest}
                    />
                    {hasClear && (
                        <Clear onPress={clearInput}>
                            <ClearIcon fill={theme.color.ashGrey} />
                        </Clear>
                    )}
                </Row>
            </Root>
        );
    }
}

CustomTextInput.propTypes = {
    clearInput: PropTypes.func,
};

export default withTheme(CustomTextInput);
