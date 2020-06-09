import React, { Component } from "react";
import { Keyboard, Alert, KeyboardAvoidingView } from "react-native";
import styles from "./styles";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import NavigationService from "service/Navigation";
import withObservableStream from "observable/withObservableStream";
import activityObservables from "observable/activity";
import { NavigationBar } from "common/views";
import { CloseIcon } from "res/icons";
import R from "res/R";
import { normalizeActivity, prepareAttachments } from "utils/helper";
import { NavigationEvents } from "react-navigation";
import { ContainerView } from "common/themed";

class PostFeedScreen extends Component {
    _contentRef: ?PostContent;
    _footerRef: ?PostFooter;

    initialState = () => ({
        canSubmit: false,
        isSubmitting: false,
        action: null,
        text: "",
        attachments: [],
        editing: false,
        id: null,
    });

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const action = navigation.getParam("action", null);
        let activity = navigation.getParam("activity", null);
        const editing = navigation.getParam("editing", false);
        let text = "";
        let attachments = [];
        let id = null;
        if (activity) {
            activity = normalizeActivity(activity);
            text = activity.text;
            if (text === undefined) {
                if (typeof activity.object === "string") {
                    text = activity.object;
                } else {
                    text = "";
                }
            }
            text = text.trim();
            attachments = prepareAttachments(activity.attachments);
            id = activity.id;
        }
        this.state = { ...this.initialState(), action, text, attachments, editing, id };
    }

    componentDidMount() {
        this._setupObservables();
    }

    componentWillUnmount() {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
    }

    _setupObservables = () => {
        const { subscriptions } = this.props;
        subscriptions.push(
            activityObservables.subjects.newPostFeedSubject$.subscribe(async status => {
                if (status === activityObservables.constants.SUCCESS) {
                    await this._contentRef.resetState();
                    await this.setState({ ...this.initialState() });
                    NavigationService.back();
                } else {
                    await this.setState({
                        isSubmitting: status === activityObservables.constants.LOADING,
                    });
                }
            }),
        );
        subscriptions.push(
            activityObservables.subjects.updateActivitySubject$.subscribe(({ status }) => {
                if (status === activityObservables.constants.SUCCESS) {
                    this._contentRef.resetState();
                    this.setState({ ...this.initialState() });
                    NavigationService.back();
                } else {
                    this.setState({
                        isSubmitting: status === activityObservables.constants.LOADING,
                    });
                }
            }),
        );
    };

    _onCloseModal = async () => {
        Keyboard.dismiss();

        if (this._contentRef._canSubmit()) {
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
                            this._contentRef.resetState();
                            this.setState({ ...this.initialState() });
                            NavigationService.back();
                        },
                    },
                ],
                { cancelable: false },
            );
        } else {
            await this._contentRef.resetState();
            await this.setState({ ...this.initialState() });
            NavigationService.back();
        }
    };

    _onPickerImage = async images => {
        if (this._contentRef) {
            await this._contentRef.addImage(images);
        }
    };

    _onAddLink = async links => {
        if (this._contentRef) {
            await this._contentRef.addLinks(links);
        }
    };
    _onAddGif = async url => {
        if (this._contentRef) {
            await this._contentRef.addGif(url);
        }
    };
    _onSubmit = async () => {
        if (this._contentRef) {
            await this._contentRef.onSubmitForm(this.state.editing);
        }
    };

    _onDidFocus = payload => {
        const {
            action: { params },
        } = payload;
        if (this._contentRef && (!params || params.action === 1)) {
            this._contentRef.setFocus();
        }
        if (this._footerRef && params) {
            const { action } = params;
            if (action) {
                if (action === R.constants.post.link) {
                    this._footerRef._openLinkModal();
                } else if (action === R.constants.post.gif) {
                    this._footerRef._openGifModal();
                } else if (action === R.constants.post.image) {
                    this._footerRef._handleImagePress();
                }
            }
        }
    };

    _onDidBlur = payload => {
        this.setState({ action: null });
    };
    render() {
        const { isSubmitting, canSubmit, action, text, attachments, editing, id } = this.state;
        return (
            <ContainerView>
                <NavigationEvents onDidFocus={this._onDidFocus} onDidBlur={this._onDidBlur} />
                <NavigationBar
                    title={`${editing ? "Edit" : "Create"} Post`}
                    leftIcon={<CloseIcon />}
                    rightButtonText={R.strings.button[editing ? "save" : "post"]}
                    handleLeft={this._onCloseModal}
                    handleRight={this._onSubmit}
                    isLoading={isSubmitting}
                    disabled={!canSubmit}
                />
                <KeyboardAvoidingView style={styles.container}>
                    <PostContent
                        onRef={ref => (this._contentRef = ref)}
                        onChangeStatus={status => {
                            if (this.state.canSubmit !== status) {
                                this.setState({ canSubmit: status });
                            }
                        }}
                        isSubmitting={isSubmitting}
                        action={action}
                        text={text}
                        attachments={attachments}
                        id={id}
                    />
                    <PostFooter
                        onRef={ref => (this._footerRef = ref)}
                        onPickerImage={this._onPickerImage}
                        onAddLink={this._onAddLink}
                        onAddGif={this._onAddGif}
                        onSubmit={this._onSubmit}
                        isSubmitting={isSubmitting}
                        action={action}
                    />
                </KeyboardAvoidingView>
            </ContainerView>
        );
    }
}

PostFeedScreen.propTypes = {};

PostFeedScreen.defaultProps = {};

export default withObservableStream({})(PostFeedScreen);
