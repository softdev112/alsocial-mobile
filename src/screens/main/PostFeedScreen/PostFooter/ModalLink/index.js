// @flow
import React, { Component } from "react";
import { Modal, Keyboard, Alert, View, Platform, KeyboardAvoidingView } from "react-native";
import styles, { ContainerScrollView } from "./styles";
import { NavigationBar } from "common/views";
import { FocusTextInput } from "common/textInputs";
import PostAttachments from "../../PostAttatchments";
import { ContainerView, ContentView, StatusBarView } from "common/themed";

type Props = {
    visibleModal: boolean,
    onCloseReq: Function,
    onSelectLink: Function,
};
type State = {
    text: string,
};

class ModalLink extends Component<Props, State> {
    _attachmentsRef: ?PostAttachments = null;
    _textInputRef: ?FocusTextInput = null;

    initialState = {
        text: "",
        isAvailable: false,
    };

    constructor(props) {
        super(props);
        this.state = { ...this.initialState };
    }

    resetState = () => {
        this.setState({ ...this.initialState });
        if (this._attachmentsRef) {
            this._attachmentsRef.resetState();
        }
    };

    onChangeText = (text: string) => {
        this.setState({ text });
        if (this._attachmentsRef && text?.length) {
            this._attachmentsRef._handleOgDebounced(text);
        }
    };

    handleSubmit = () => {
        const { onSelectLink } = this.props;
        onSelectLink(this._attachmentsRef?._availableOg());
        this.resetState();
    };

    _canSubmit = () =>
        this._attachmentsRef &&
        !this._attachmentsRef._isOgScraping() &&
        this._attachmentsRef._isAvailable();

    _onCloseReq = async () => {
        Keyboard.dismiss();

        const { onCloseReq } = this.props;
        if (this._canSubmit()) {
            Alert.alert(
                "Discard Post?",
                "You can't undo this and you'll lose your draft.",
                [
                    {
                        text: "Cancel",
                        onPress: () => {},
                    },
                    {
                        text: "Discard",
                        onPress: () => {
                            this.resetState();
                            onCloseReq();
                        },
                    },
                ],
                { cancelable: false },
            );
        } else {
            this.resetState();
            onCloseReq();
        }
    };

    render() {
        const { visibleModal } = this.props;
        const { text, isAvailable } = this.state;

        return (
            <ContainerView>
                <Modal visible={visibleModal} onRequestClose={this._onCloseReq}>
                    <KeyboardAvoidingView
                        style={styles.flex}
                        behavior='padding'
                        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -310}
                        enabled
                    >
                        <ContentView>
                            {Platform.OS === "ios" ? <StatusBarView /> : null}
                            <NavigationBar
                                title='Add a link'
                                hasBackButton={true}
                                rightButtonText='Add'
                                handleLeft={this._onCloseReq}
                                handleRight={this.handleSubmit}
                                disabled={!isAvailable}
                            />
                            <ContainerScrollView
                                contentContainerStyle={styles.container}
                                keyboardShouldPersistTaps={"handled"}
                            >
                                <View style={styles.textInputContainer}>
                                    <FocusTextInput
                                        onRef={ref => (this._textInputRef = ref)}
                                        onChangeText={this.onChangeText}
                                        value={text}
                                        placeholder='Paste a url or link'
                                        multiline
                                        autoCapitalize='none'
                                        editable={true}
                                        autoFocus={true}
                                        style={styles.textInput}
                                    />
                                </View>
                                <PostAttachments
                                    onRef={ref => (this._attachmentsRef = ref)}
                                    onChangeStatus={() =>
                                        this.setState({ isAvailable: this._canSubmit() })
                                    }
                                />
                            </ContainerScrollView>
                        </ContentView>
                    </KeyboardAvoidingView>
                </Modal>
            </ContainerView>
        );
    }
}

export default ModalLink;
