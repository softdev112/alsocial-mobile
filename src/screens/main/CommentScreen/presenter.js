import React, { Component } from "react";
import { KeyboardAvoidingView, Platform, View, Keyboard } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { ContainerView } from "common/themed";
import { LightFlatList, NavigationBar } from "common/views";
import { CommentTextInputContainer } from "common/containers";
import { MentionTextInput } from "common/textInputs";
import { ActivityFeedItem, CommentItem } from "components";
import activityObservables from "observable/activity";
import R from "res/R";
import { resetComment } from "models/comment";
import { resetActivityFeed } from "models/activityFeed";
import MixpanelService from "service/Mixpanel";
import { BranchEvent } from "react-native-branch";
import NavigationService from "service/Navigation";
import _ from "lodash";
import UserProfileScreen from "../UserProfileScreen";
import withObservableStream from "observable/withObservableStream";
import { LargeText } from "common/themed";

class CommentScreen extends Component {
    _listRef: ?LightFlatList = null;
    _textInputRef: ?MentionTextInput = null;
    _next = null;
    _headerHeight = 0;

    state = {
        activity: null,
        feedType: null,
        text: "",
        editText: null,
        editComment: null,
        didLoaded: false,
        isAutocomplete: false,
        isLoadingUserProfile: false,
        isLoadingActivity: false,
        isLoadingComments: false,
        isDeletedActivity: false,
        isMention: false,
        label: "Reply",
    };

    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return !_.isEqual(nextState, this.state);
    }

    constructor(props) {
        super(props);
        const { navigation } = props;
        const activity = navigation.getParam("activity", null);
        const feedType = navigation.getParam("feedType", null);
        const isMention = navigation.getParam("isMention", false);

        if (activity) {
            this.state = {
                activity: this._checkStatus(activity),
                feedType,
                inputHeight: 32,
                text: "",
                editText: null,
                editComment: null,
                didLoaded: false,
                isAutocomplete: false,
                isLoadingActivity: false,
                isDeletedActivity: false,
                isMention,
                label: "Reply",
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
        this._listRef = null;
        this._textInputRef = null;
    }

    _setupObservables = () => {
        const { subscriptions } = this.props;

        subscriptions.push(
            activityObservables.subjects.commentSubject$.subscribe(
                ({ activity, comment, status }) => {
                    if (
                        status === activityObservables.constants.SUCCESS &&
                        this._isCurrentActivity(activity?.id)
                    ) {
                        this._onAddedComment(resetComment(this.props.user._id, comment));
                    }
                },
            ),
        );

        subscriptions.push(
            activityObservables.subjects.deleteCommentSubject$.subscribe(
                ({ activity, comment, status }) => {
                    comment.isDeleting = status === activityObservables.constants.LOADING;
                    if (
                        status === activityObservables.constants.SUCCESS &&
                        this._isCurrentActivity(activity?.id)
                    ) {
                        this._onDeletedComment(comment?.id);
                    }
                },
            ),
        );

        subscriptions.push(
            activityObservables.subjects.deleteSubject$.subscribe(({ activity, status }) => {
                if (status === activityObservables.constants.SUCCESS) {
                    this._onDeleteActivity(activity?.id);
                }
            }),
        );

        subscriptions.push(
            activityObservables.subjects.loadActivitySubject$.subscribe(
                ({ activityId, newActivity, status }) => {
                    if (activityId !== this.state.activity?.id) {
                        return;
                    }

                    this.setState({
                        isLoadingActivity: status === activityObservables.constants.LOADING,
                    });
                    if (status === activityObservables.constants.SUCCESS) {
                        if (newActivity) {
                            this.setState({
                                activity: this._checkStatus(newActivity),
                                didLoaded: true,
                            });
                            this._loadComments(true);
                        } else {
                            this._listRef = null;
                            this.setState({
                                isDeletedActivity: true,
                                didLoaded: true,
                            });
                        }
                        this.forceUpdate();
                    } else if (status === activityObservables.constants.FAILED) {
                        this.setState({
                            isDeletedActivity: true,
                            didLoaded: true,
                        });
                        if (this._listRef) {
                            this._listRef.resetLoading();
                        }
                        this.forceUpdate();
                    }
                },
            ),
        );
    };

    _isCurrentActivity = activityId => {
        return activityId === this.state.activity.id;
    };

    _onDeleteActivity = activityId => {
        if (this._isCurrentActivity(activityId)) {
            NavigationService.back();
        }
    };

    _onAddedComment = async comment => {
        if (comment && this._listRef) {
            await this._listRef.addItems([comment]);
            this._listRef.scrollToOffset(this._headerHeight);
        }
    };

    _onDeletedComment = commentId => {
        if (commentId && this._listRef) {
            this._listRef.deleteItem(commentId);
        }
    };

    _checkStatus = activity => {
        return resetActivityFeed(activity);
    };

    setItems = async (isNew, results, error) => {
        const { user } = this.props;
        if (this._listRef) {
            await this._listRef.setItems(
                isNew,
                results ? results?.map(comment => resetComment(user._id, comment)) : null,
                error,
            );
        }
    };

    _loadComments = async isRefresh => {
        if (!this._listRef) {
            return;
        }

        if (isRefresh) {
            this._next = undefined;
        } else if (this.state.isLoadingComments) {
            return;
        }

        const { commentsRequest } = this.props;
        const {
            activity: { id },
        } = this.state;
        await commentsRequest({
            next: this._next,
            activityId: id,
            callback: ({ isLoading, results, next, curNext, error }) => {
                if (!this._listRef || this._next !== curNext) {
                    return;
                }
                this.setState({ isLoadingComments: isLoading });
                if (!isLoading) {
                    if (results && Array.isArray(results)) {
                        this.setItems(isRefresh, results, error);
                        this._next = next;
                    } else {
                        this._listRef.resetLoading();
                    }
                    _.debounce(this._listRef.scrollToOffset, 100)(this._headerHeight);
                }
            },
        });
    };

    _onRefresh = async () => {
        const { fetchSingleActivityRequest } = this.props;
        const { activity } = this.state;
        await this.setState(
            {
                isLoadingActivity: true,
            },
            () => {
                fetchSingleActivityRequest({
                    activity,
                });
            },
        );
    };

    _onLoadMore = async () => {
        await this._loadComments(false);
    };

    _onReply = replyTo => {
        this.setState({ text: replyTo }, () => {
            if (this._textInputRef) {
                this._textInputRef.setFocus();
            }
        });
    };

    _onEdit = comment => {
        const editText = comment.data?.text;
        this.setState({ text: editText, editText, comment, label: "Cancel" }, () => {
            if (this._textInputRef) {
                this._textInputRef.setFocus();
            }
        });
    };

    _renderNavigationBar = () => {
        return <NavigationBar title={"Comment"} hasBackButton={true} />;
    };

    _renderHeader = () => {
        const { activity, didLoaded } = this.state;
        return didLoaded && activity ? (
            <ActivityFeedItem
                activity={activity}
                keyValue={`{activity-feed-${activity.id}`}
                onLayout={({
                    nativeEvent: {
                        layout: { height },
                    },
                }: Object) => {
                    if (this._headerHeight === 0 && this._listRef) {
                        _.debounce(this._listRef.scrollToOffset, 100)(height);
                    }
                    this._headerHeight = height;
                }}
                feedType={R.strings.feedType.comment}
            />
        ) : null;
    };
    _renderItem = ({ item, index }) => {
        const { activity, feedType } = this.state;
        return item.isDeleting ? null : (
            <CommentItem
                comment={item}
                keyValue={`comment-${item.id}-${index}`}
                activity={activity}
                onReply={this._onReply}
                onEdit={this._onEdit}
                feedType={feedType}
            />
        );
    };

    _dismiss = () => {
        Keyboard.dismiss();
        if (this._textInputRef) {
            this._textInputRef._onBlur();
        }
    };

    _onChangeText = text => {
        if (this.state.text !== text) {
            const { editText } = this.state;
            const label = editText === null ? "Reply" : text === editText ? "Cancel" : "Save";
            this.setState({ text, label });
        }
    };

    _onKeyPress = ({ nativeEvent: { key: keyValue } }) => {
        const { label } = this.state;
        if (label !== "Reply" && keyValue === "Backspace" && !this.state.text.length) {
            if (label === "Cancel") {
                this.setState({ editText: null, comment: null, label: "Reply" });
            } else {
                this.setState({ label: "Cancel" });
            }
        }
    };

    _onShowAutocomplete = showed => {
        if (this.state.isAutocomplete !== showed) {
            this.setState({ isAutocomplete: showed });
        }
    };

    _trimText = () => this.state.text.trim();

    _canSubmit = () => {
        const text = this._trimText();
        const { editText } = this.state;
        return !!text?.length || editText !== null;
    };

    _onSubmit = () => {
        const text = this._trimText();
        const { activity, feedType, editText } = this.state;
        if (editText !== text) {
            if (editText === null) {
                const { submitCommentRequest } = this.props;
                submitCommentRequest({
                    activity,
                    comment: text,
                    feedType,
                });
            } else if (!!text.length && this.state.comment !== null) {
                const { updateCommentRequest } = this.props;
                const { comment } = this.state;
                updateCommentRequest({
                    activity,
                    activityId: comment.activity_id,
                    commentId: comment.id,
                    text,
                    feedType,
                });
            }
        }

        this.setState({ text: "", editText: null, comment: null, label: "Reply" });
    };

    _renderDeletedPost = () => (
        <View style={styles.deletedContainer}>
            <LargeText style={{ textAlign: "center" }}>
                This post is unavailable because it was deleted.
            </LargeText>
        </View>
    );

    // Render any loading content that you like here
    render() {
        const {
            activity,
            text,
            isDeletedActivity,
            isLoadingActivity,
            isLoadingComments,
            didLoaded,
            isMention,
            label,
        } = this.state;
        const canSubmit = Boolean(this._canSubmit());
        return (
            <ContainerView>
                <KeyboardAvoidingView style={styles.flex}>
                    <View
                        style={styles.container}
                        pointerEvents={isLoadingActivity || isLoadingComments ? "none" : "auto"}
                    >
                        {isDeletedActivity && isMention && activity?.actor
                            ? null
                            : this._renderNavigationBar()}
                        {!isDeletedActivity ? (
                            <View style={styles.content}>
                                {didLoaded ? (
                                    <MentionTextInput
                                        onRef={ref => (this._textInputRef = ref)}
                                        placeholder='Add a comment'
                                        containerStyle={{
                                            bottom: 0,
                                            flexDirection: "column-reverse",
                                        }}
                                        inputStyle={styles.input}
                                        text={text}
                                        onChangeText={this._onChangeText}
                                        multiline={true}
                                        onShowResults={this._onShowAutocomplete}
                                        TextInputContainer={CommentTextInputContainer}
                                        canSubmit={canSubmit}
                                        onSubmit={this._onSubmit}
                                        autoFocus={true}
                                        onKeyPress={this._onKeyPress}
                                        label={label}
                                        scrollEnabled={true}
                                    />
                                ) : null}
                                <LightFlatList
                                    onRef={ref => (this._listRef = ref)}
                                    ListHeaderComponent={this._renderHeader}
                                    renderItem={this._renderItem}
                                    onRefresh={this._onRefresh}
                                    onLoadMore={this._onLoadMore}
                                    limit={R.limits.comments}
                                    noMoreText={""}
                                    keyboardShouldPersistTaps={"always"}
                                    keyboardDismissMode={"on-drag"}
                                />
                            </View>
                        ) : isMention && activity?.actor ? (
                            <UserProfileScreen actor={activity?.actor} />
                        ) : (
                            this._renderDeletedPost()
                        )}
                    </View>
                </KeyboardAvoidingView>
            </ContainerView>
        );
    }
}

CommentScreen.propTypes = {
    commentsRequest: PropTypes.func,
    submitCommentRequest: PropTypes.func,
    fetchSingleActivityRequest: PropTypes.func,
    user: PropTypes.object,
};

export default withObservableStream({})(CommentScreen);
