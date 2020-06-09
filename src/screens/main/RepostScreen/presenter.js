import React, { Component } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import styles, { BottomLineView } from "./styles";
import { ContainerView } from "common/themed";
import { NavigationBar, UserItem } from "common/views";
import { MentionTextInput } from "common/textInputs";
import { ActivityFeedItem } from "components";
import { MentionTextInputContainer } from "common/containers";
import NavigationService from "service/Navigation";
import PropTypes from "prop-types";
import R from "res/R";
import withObservableStream from "observable/withObservableStream";
import activityObservables from "observable/activity";

class RepostScreen extends Component {
    initialState = () => ({
        activity: null,
        inputHeight: 30,
        isAutoComplete: false,
        text: "",
        editing: false,
    });
    constructor(props) {
        super(props);
        const { navigation } = props;
        const activity = navigation.getParam("activity", null);
        const text = navigation.getParam("text", "");
        const editing = navigation.getParam("editing", false);
        if (activity) {
            activity.isReposting = activityObservables.modules.repost.isLoading(activity?.id);
            this.state = {
                ...this.initialState(),
                activity,
                text: text || "",
                editing,
            };
        } else {
            NavigationService.back();
        }
    }

    componentDidMount(): void {
        this._setupObservables();
    }

    componentWillUnmount(): void {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
    }

    _trimText = () => this.state.text.trim();

    _setupObservables = () => {
        const { subscriptions } = this.props;
        subscriptions.push(
            activityObservables.subjects.repostSubject$.subscribe(
                ({ activityId, repostId, status }) => {
                    const { activity } = this.state;
                    if (activityId !== activity?.id) {
                        return;
                    }

                    activity.isReposting = status === activityObservables.constants.LOADING;

                    if (status === activityObservables.constants.SUCCESS) {
                        NavigationService.back();
                    } else {
                        this.forceUpdate();
                    }
                },
            ),
        );
        subscriptions.push(
            activityObservables.subjects.updateRepostSubject$.subscribe(
                ({ activityId, status }) => {
                    const { activity } = this.state;
                    if (activityId !== activity?.id) {
                        return;
                    }

                    activity.isReposting = status === activityObservables.constants.LOADING;

                    if (status === activityObservables.constants.SUCCESS) {
                        NavigationService.back();
                    } else {
                        this.forceUpdate();
                    }
                },
            ),
        );
    };
    _onSubmit = () => {
        const { editRequest, repostRequest } = this.props;
        const { activity, editing } = this.state;
        if (activity.isReposting) {
            return;
        }

        if (editing) {
            editRequest({ activity, text: this._trimText() });
        } else {
            repostRequest({ activity, text: this._trimText() });
        }
    };

    _onShowAutocomplete = showed => {
        if (this.state.isAutoComplete !== showed) {
            this.setState({ isAutoComplete: showed });
        }
    };

    _onChangeText = text => {
        if (this.state.text !== text) {
            this.setState({ text });
        }
    };

    render() {
        const { activity, inputHeight, text, isAutoComplete, editing } = this.state;
        const { owner } = this.props;
        const isReposting = activity?.isReposting;
        return activity ? (
            <ContainerView>
                <KeyboardAvoidingView style={styles.content}>
                    <View style={styles.content}>
                        <NavigationBar
                            title={`${editing ? "Edit " : ""}Repost`}
                            hasBackButton={true}
                            rightButtonText={editing ? "Save" : "Repost"}
                            handleRight={this._onSubmit}
                            isLoading={isReposting}
                        />
                        <ScrollView
                            keyboardShouldPersistTaps='handled'
                            scrollEnabled={!isAutoComplete}
                        >
                            <View
                                style={styles.content}
                                pointerEvents={isReposting ? "none" : "auto"}
                            >
                                <View style={styles.inputContainer}>
                                    <UserItem
                                        actorId={owner._id}
                                        actor={owner}
                                        username={owner.username}
                                        isRepost={true}
                                        style={{ flex: 1 }}
                                    />
                                </View>
                                <MentionTextInput
                                    placeholder='Say something about this...'
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
                                    autoFocus={true}
                                />
                                <BottomLineView />
                                <ActivityFeedItem
                                    activity={activity}
                                    keyValue={`comment-feed-${activity.id}`}
                                    isChild={true}
                                    feedType={R.strings.feedType.repost}
                                    editing={editing}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </ContainerView>
        ) : null;
    }
}

RepostScreen.propTypes = {
    user: PropTypes.object,
    repostRequest: PropTypes.func,
    editRequest: PropTypes.func,
};

RepostScreen.defaultProps = {};

export default withObservableStream({})(RepostScreen);
