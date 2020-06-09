import React, { PureComponent } from "react";
import { Platform, View } from "react-native";
import AutoCompleteMention from "../../views/AutoCompleteMention";
import PropTypes from "prop-types";
import styles from "./styles";
import FocusTextInput from "../FocusTextInput";

class MentionTextInput extends PureComponent {
    _autoCompleteRef: ?AutoCompleteMention = null;
    _textInputRef: ?FocusTextInput = null;

    state = {
        left: 0,
        right: 0,
        pos: 0,
        inputHeight: 40,
    };

    componentDidMount(): void {
        const { onRef } = this.props;
        if (onRef) {
            onRef(this);
        }
    }

    componentWillUnmount(): void {
        this._autoCompleteRef = null;
    }

    setFocus = () => {
        if (this._textInputRef) {
            this._textInputRef.setFocus();
        }
    };

    _onSelectUser = user => {
        const { text, onChangeText } = this.props;
        if (!(onChangeText && user && user?.username?.length)) {
            return;
        }

        this._onBlur();

        const { left, right, pos } = this.state;

        let newText = "";

        if (right < 0) {
            newText = `${text.slice(0, left)}@${user.username}`;
        } else {
            newText = `${text.slice(0, left)}@${user.username}${text.slice(right + pos)}`;
        }
        onChangeText(newText);

        if (this._textInputRef && right > 0 && Platform.OS === "android") {
            this.rootInput = this.rootInput || this._textInputRef;
            while (!this.rootInput.hasOwnProperty("setNativeProps")) {
                this.rootInput = this.rootInput._textInputRef;
            }
            this.rootInput.setNativeProps({
                selection: {
                    start: left + user.username.length + 1,
                    end: left + user.username.length + 1,
                },
            });
        }
    };

    _onSelectionChange = ({
        nativeEvent: {
            selection: { end, start },
        },
    }: Object) => {
        if (end === start) {
            this.setState({ selection: start, searchList: [] });
        }
        if (Platform.OS === "android") {
            this.rootInput = this.rootInput || this._textInputRef;
            while (!this.rootInput.hasOwnProperty("setNativeProps")) {
                this.rootInput = this.rootInput._textInputRef;
            }
            this.rootInput.setNativeProps({
                selection: null,
            });
        }
    };

    _onFocus = () => {};

    _onBlur = () => {
        if (this._autoCompleteRef) {
            this._autoCompleteRef._dismissAutoComplete();
        }
    };

    _onChangeText = (text: string) => {
        const { onChangeText } = this.props;
        if (onChangeText) {
            onChangeText(text);
            this.getWordAt(text);
        }
    };

    getWordAt = (text: string) => {
        if (this._autoCompleteRef === null) {
            return;
        }

        const str = String(text);
        const pos = (Number(this.state.selection) - (Platform.OS === "ios" ? 1 : 0)) >>> 0;
        if (str.length && pos >= 0) {
            const lastChar = str[pos];
            if (lastChar === " " || lastChar === "\n") {
                this._autoCompleteRef._dismissAutoComplete();
                return;
            }
        }

        let mention = "";

        const left = str.slice(0, pos).search(/[@\w._]+$/);
        const right = str.slice(pos).search(/\s/);

        if (right < 0) {
            mention = str.slice(left);
        } else {
            mention = str.slice(left, right + pos);
        }
        if (mention && mention[0] === "@") {
            this.setState({ left, right, pos });
            this._autoCompleteRef._handleMentionDebounced(mention.slice(1));
        } else {
            this._autoCompleteRef._dismissAutoComplete();
        }
    };

    _onSubmit = () => {
        this._onBlur();
        this.props.onSubmit();
    };

    _onLayout = ({
        nativeEvent: {
            layout: { height },
        },
    }: Object) => {
        if (this.state.inputHeight !== height) {
            this.setState({ inputHeight: height });
        }
    };

    _renderTextInput = () => {
        const {
            text,
            placeholder,
            autoFocus,
            inputContainerStyle,
            inputStyle,
            multiline,
            TextInputContainer,
            canSubmit,
            maxLength,
            editable,
            label,
            onKeyPress,
            scrollEnabled,
        } = this.props;
        return (
            <TextInputContainer
                onLayout={this._onLayout}
                inputContainerStyle={inputContainerStyle}
                canSubmit={canSubmit}
                onSubmit={this._onSubmit}
                label={label}
            >
                <FocusTextInput
                    onRef={ref => (this._textInputRef = ref)}
                    style={{ ...styles.input, ...inputStyle }}
                    value={text}
                    onBlur={this._onBlur}
                    onChangeText={this._onChangeText}
                    onSelectionChange={this._onSelectionChange}
                    onFocus={this._onFocus}
                    multiline={multiline}
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    editable={editable}
                    onKeyPress={onKeyPress}
                    blurOnSubmit={false}
                    scrollEnabled={scrollEnabled}
                />
            </TextInputContainer>
        );
    };

    render() {
        const { containerStyle, onShowResults, listStyle, listContainerStyle } = this.props;
        const { inputHeight } = this.state;
        return (
            <>
                <AutoCompleteMention
                    onRef={ref => (this._autoCompleteRef = ref)}
                    renderTextInput={this._renderTextInput}
                    onSelectedUser={this._onSelectUser}
                    containerStyle={containerStyle}
                    listStyle={listStyle}
                    listContainerStyle={listContainerStyle}
                    onShowResults={onShowResults}
                />
                <View
                    style={{
                        height: inputHeight,
                    }}
                />
            </>
        );
    }
}

MentionTextInput.propTypes = {
    onRef: PropTypes.func,
    placeholder: PropTypes.string,
    multiline: PropTypes.bool,
    containerStyle: PropTypes.object,
    inputContainerStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    listStyle: PropTypes.object,
    listContainerStyle: PropTypes.object,
    autoFocus: PropTypes.bool,
    onChangeText: PropTypes.func,
    text: PropTypes.string,
    onLayout: PropTypes.func,
    onShowResults: PropTypes.func,
    TextInputContainer: PropTypes.elementType,
    canSubmit: PropTypes.bool,
    onSubmit: PropTypes.func,
    maxLength: PropTypes.number,
    editable: PropTypes.bool,
    label: PropTypes.string,
    onKeyPress: PropTypes.func,
    scrollEnabled: PropTypes.bool,
};

MentionTextInput.defaultProps = {
    onRef: null,
    placeholder: "",
    multiline: true,
    containerStyle: {},
    inputContainerStyle: {},
    inputStyle: {},
    listContainerStyle: {},
    autoFocus: false,
    onChangeText: null,
    text: "",
    onLayout: null,
    onShowResults: null,
    canSubmit: false,
    onSubmit: () => {},
    editable: true,
    label: "",
    onKeyPress: null,
    scrollEnabled: false,
};

export default MentionTextInput;
