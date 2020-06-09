import React, { Component } from "react";
import { View, ScrollView, Platform, Keyboard } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import _keyBy from "lodash/keyBy";
import { UserItem } from "common/views";
import { MentionTextInput } from "common/textInputs";
import { MentionTextInputContainer } from "common/containers";
import MixpanelService from "service/Mixpanel";
import R from "res/R";
import PostAttachments from "../PostAttatchments";

class PostContent extends Component {
    _attachmentsRef: ?PostAttachments = null;
    _textInputRef: ?MentionTextInput = null;

    initialState = () => ({
        text: "",
        isAutoComplete: false,
    });

    constructor(props) {
        super(props);
        this.state = { ...this.initialState() };
        if (props.text) {
            this.state.text = props.text;
        }
    }

    componentDidMount(): void {
        this.props.onRef(this);
    }

    resetState = () => {
        this.setState({ ...this.initialState() });
        if (this._attachmentsRef) {
            this._attachmentsRef.resetState();
        }
    };

    setFocus = (value = true) => {
        if (this._textInputRef && value) {
            this._textInputRef.setFocus();
        }
    };

    _canSubmit = () =>
        this._attachmentsRef &&
        !this._attachmentsRef._isOgScraping() &&
        (this._attachmentsRef._isAvailable() || !!this.state.text.trim().length);

    addImage = images => {
        if (this._attachmentsRef) {
            this._attachmentsRef.addImage(images);
        }
    };

    addLinks = links => {
        if (this._attachmentsRef) {
            this._attachmentsRef.addLinks(links);
        }
    };

    addGif = url => {
        if (this._attachmentsRef) {
            this._attachmentsRef.addGif(url);
        }
    };

    _onChangeText = async (text: string) => {
        if (text.length <= R.limits.postLength) {
            await this.setState({ text });
            if (this._attachmentsRef && text?.length) {
                this._attachmentsRef._handleOgDebounced(text);
            }
            this.props.onChangeStatus(this._canSubmit());
        }
    };

    _onShowAutocomplete = showed => {
        if (this.state.isAutoComplete !== showed) {
            this.setState({ isAutoComplete: showed });
        }
    };

    async addActivity(editing = false) {
        if (!this._attachmentsRef) {
            return;
        }

        const text = this.state.text.trim();
        const activity = {
            actor: this.props.owner,
            verb: "post",
            // object can not be empty, ' ' is for OG posts w/o any text
            object: text.length ? text : " ",
            text,
        };

        if (this.props.id) {
            activity.id = this.props.id;
        }

        const uploadedImages = this._attachmentsRef._orderedImages();
        const uploadedFiles = this._attachmentsRef._orderedFiles();
        const availableOg = this._attachmentsRef._availableOg();

        activity.attachments = {};
        activity.attachments.og = availableOg;

        if (uploadedImages) {
            activity.attachments.images = uploadedImages;
        }

        // map by unique key while preserving original index position in the array
        const maps = {
            images: _keyBy(
                (uploadedImages || []).map((value, idx) => ({ idx, id: value.id })),
                ({ id }) => id,
            ),
            files: _keyBy(
                (uploadedFiles || []).map((value, idx) => ({ idx, id: value.id })),
                ({ id }) => id,
            ),
            og: _keyBy(
                (availableOg || []).map((value, idx) => ({ idx, id: value.url })),
                ({ id }) => id,
            ),
        };
        activity.attachments.order = this._attachmentsRef
            ._order()
            .map(({ type, id }) => ({
                type,
                idx: maps[type][id] ? maps[type][id].idx : null,
            }))
            .filter(({ idx }) => idx !== null);

        return await this.props[`${editing ? "edit" : "create"}Activity`](activity);
    }

    onSubmitForm = async (editing = false) => {
        try {
            Keyboard.dismiss();
            await this.addActivity(editing);
        } catch (e) {}
    };

    render() {
        const { text, isAutoComplete } = this.state;
        const { owner, isSubmitting, onChangeStatus, action, attachments } = this.props;
        return (
            <ScrollView
                style={styles.flex}
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps={"handled"}
                scrollEnabled={!isAutoComplete}
                pointerEvents={isSubmitting ? "none" : "auto"}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.inputContainer}>
                        <UserItem
                            actorId={owner._id}
                            actor={owner}
                            username={owner.username}
                            preventOnPress={true}
                            style={{ flex: 1 }}
                        />
                    </View>
                    <MentionTextInput
                        onRef={ref => (this._textInputRef = ref)}
                        placeholder={R.strings.whatshappening}
                        containerStyle={{
                            ...styles.inputContainer,
                            top: R.dimensions.header.height.normal,
                        }}
                        inputStyle={styles.input}
                        text={text}
                        onChangeText={this._onChangeText}
                        multiline={true}
                        onShowResults={this._onShowAutocomplete}
                        TextInputContainer={MentionTextInputContainer}
                        autoFocus={!action || action === 1}
                    />
                    <PostAttachments
                        onRef={ref => (this._attachmentsRef = ref)}
                        attachments={attachments}
                        isSubmitting={isSubmitting}
                        onChangeStatus={() => onChangeStatus(this._canSubmit())}
                    />
                </View>
            </ScrollView>
        );
    }
}

PostContent.propTypes = {
    owner: PropTypes.object,
    createActivity: PropTypes.func,
    editActivity: PropTypes.func,
    onChangeStatus: PropTypes.func,
    onSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    action: PropTypes.number,
    text: PropTypes.string,
    attachments: PropTypes.array,
    id: PropTypes.string,
};

PostContent.defaultProps = {
    onChangeStatus: () => {},
    isSubmitting: false,
    action: null,
    text: "",
    attachments: [],
    id: null,
};

export default PostContent;
