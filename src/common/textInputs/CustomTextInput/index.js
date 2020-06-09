// @flow
import React, { PureComponent } from "react";
import R from "res/R";
import PropTypes from "prop-types";
import _ from "lodash";
import { InputArea } from "./styles";
import { withTheme } from "styled-components";

class CustomTextInput extends PureComponent {
    _textInputRef: Object = React.createRef();

    state = {
        inputHeight: 32,
    };

    componentDidMount() {
        const { onRef } = this.props;
        if (onRef) {
            onRef(this);
        }
    }

    updateCursor = async index => {
        if (this._textInputRef) {
            // await this._textInputRef.setNativeProps({ selection: { start: index, end: index } });
            // await this._textInputRef.setNativeProps({ selection: undefined });
        }
    };

    setFocus = () => {
        if (this._textInputRef) {
            _.debounce(this._textInputRef.focus, 100)();
        }
    };

    setInputType = () => {
        const { type } = this.props;

        switch (type) {
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
            case "email":
                return {
                    autoCorrect: false,
                    spellCheck: false,
                    keyboardType: "email-address",
                    autoCapitalize: "none",
                };
            default:
                return {
                    autoCorrect: true,
                    spellCheck: true,
                    keyboardType: "default",
                };
        }
    };

    _onContentSizeChange = ({
        nativeEvent: {
            contentSize: { width, height },
        },
    }) => {
        if (this.state.inputHeight !== height) {
            this.setState({ inputHeight: height });
            const { onContentSizeChange } = this.props;
            if (onContentSizeChange) {
                onContentSizeChange({ width, height });
            }
        }
    };
    render() {
        const { style, onContentSizeChange, placeholderTextColor, theme, ...rest } = this.props;
        const heightStyle = onContentSizeChange
            ? {
                  height: this.state.inputHeight,
              }
            : null;
        return (
            <InputArea
                ref={ref => (this._textInputRef = ref)}
                {...this.setInputType()}
                style={{
                    ...style,
                    ...heightStyle,
                    textAlignVertical: "center",
                }}
                onContentSizeChange={this._onContentSizeChange}
                placeholderTextColor={
                    placeholderTextColor ? placeholderTextColor : theme.color.dark
                }
                {...rest}
            />
        );
    }
}

CustomTextInput.propTypes = {
    placeholderTextColor: PropTypes.string,
};
export default withTheme(CustomTextInput);
