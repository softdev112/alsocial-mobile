import React, { Component } from "react";
import { View, Alert, Platform } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import R from "res/R";
import { RenderText } from "common/views";
import { AvatarImage } from "common/images";
import { LikeButton } from "common/buttons";
import { CountsLabel, TimeLabel } from "common/labels";
import NavigationService from "service/Navigation";
import { Main } from "utils/navigation";
import CommentSwipeableRow from "./CommentSwipeableRow";
import withObservableStream from "observable/withObservableStream";
import activityObservables from "observable/activity";
import { withBottomSheet } from "components/BottomSheet";
import _ from "lodash";

class CommentItem extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return (
            nextProps.activity?.id === this.props.activity?.id &&
            nextProps.comment?.id === this.props.comment?.id &&
            (nextProps.comment.refresh ||
                !_.isEqual(
                    nextProps.comment?.children_counts,
                    this.props.comment?.children_counts,
                ) ||
                nextProps.comment?.isLiking !== this.props.comment?.isLiking)
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {
        this.props.comment.refresh = false;
    }

    componentDidMount(): void {
        this._setupObservables();
    }

    componentWillUnmount(): void {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
    }

    _setupObservables = () => {
        const { subscriptions } = this.props;
        subscriptions.push(
            activityObservables.subjects.likeCommentSubject$.subscribe(
                ({ activityId, commentId, likeId, isLiked, likeCount, status }) => {
                    const { comment, activity } = this.props;
                    if (activity?.id === activityId && comment?.id !== commentId) {
                        return;
                    }

                    if (status === activityObservables.constants.LOADING) {
                        comment.isLiking = true;
                    } else {
                        comment.isLiking = false;
                        if (status === activityObservables.constants.SUCCESS) {
                            comment.isLiked = isLiked;
                            comment.likeCount = likeCount;
                            comment.likeId = likeId;
                        }
                    }
                    this.forceUpdate();
                },
            ),
        );

        subscriptions.push(
            activityObservables.subjects.deleteCommentSubject$.subscribe(
                ({ activity, comment, status }) => {
                    const { comment: prevComment } = this.props;
                    if (comment?.id !== prevComment?.id) {
                        return;
                    }

                    prevComment.isDeleting = status === activityObservables.constants.LOADING;
                    this.forceUpdate();
                },
            ),
        );

        subscriptions.push(
            activityObservables.subjects.updateCommentSubject$.subscribe(
                ({ activityId, commentId, newComment, status }) => {
                    const { comment } = this.props;
                    if (comment?.id !== commentId) {
                        return;
                    }

                    if (status === activityObservables.constants.SUCCESS) {
                        comment.data = newComment.data;
                    }

                    this.forceUpdate();
                },
            ),
        );
    };

    _handleLike = () => {
        const { toggleLikeComment, activity, comment, feedType } = this.props;
        toggleLikeComment({ activity, comment, feedType });
    };

    _onPressLikers = () => {
        const { comment } = this.props;
        NavigationService.push(Main.Like, { commentId: comment?.id });
    };

    _onDeleteComment = () => {
        Alert.alert(R.strings.delete.comment, "", [
            { text: "Cancel" },
            {
                text: "OK",
                onPress: () => {
                    const { deleteComment, activity, comment, feedType } = this.props;
                    deleteComment({ activity, comment, feedType });
                },
            },
        ]);
    };

    _onReportComment = () => {
        const { reportComment, comment, showBottomSheet } = this.props;
        const types = R.strings.reportTypes;
        const options = [...types.map(type => type.value), "Cancel"];
        const cancelButtonIndex = options.length - 1;
        const destructiveButtonIndex = options.length - 1;
        const timeout = Platform.OS === "android" ? 1500 : 100;

        setTimeout(
            () =>
                showBottomSheet(
                    {
                        options,
                        cancelButtonIndex,
                        destructiveButtonIndex,
                    },
                    buttonIndex => {
                        if (buttonIndex !== 8) {
                            const typeReport = types[buttonIndex] ? types[buttonIndex].type : "";

                            if (typeReport) {
                                reportComment({
                                    comment,
                                    typeReport,
                                });
                            }
                        }
                    },
                ),
            timeout,
        );
    };

    _onReply = () => {
        const { comment, onReply } = this.props;
        onReply(`@${comment?.user?.username}`);
    };

    _onEdit = () => {
        const { comment, onEdit } = this.props;
        onEdit(comment);
    };

    render() {
        const { comment, keyValue, activity, feedType } = this.props;
        if (!comment || !comment.id) {
            return null;
        }

        const { isOwn, isLiking, likeCount, user, time, isLiked, data } = comment;
        const { _id: actorId, username } = user;

        return (
            <CommentSwipeableRow
                isOwn={isOwn}
                onDelete={this._onDeleteComment}
                onReport={this._onReportComment}
                onReply={this._onReply}
                onEdit={this._onEdit}
                pointerEvents={comment?.isDeleting ? "none" : "auto"}
            >
                <View style={styles.container} key={keyValue}>
                    <View style={styles.avatarContainer}>
                        <AvatarImage actorId={actorId} actor={user} />
                    </View>
                    <View style={styles.content}>
                        <RenderText
                            mentions={data?.mentions}
                            text={data?.text}
                            username={username}
                            activity={activity}
                            feedType={feedType}
                        />
                        <View style={styles.bottomContainer}>
                            <TimeLabel
                                time={time}
                                type={R.strings.timeType.SHORT}
                                style={{ fontSize: R.dimensions.text.small }}
                            />
                            <View style={R.palette.space.left} />
                            <CountsLabel
                                counts={likeCount}
                                label={R.strings.like}
                                textStyle={{
                                    color: R.colors.deltaGrey,
                                    fontSize: R.dimensions.text.small,
                                }}
                                onPress={this._onPressLikers}
                            />
                        </View>
                    </View>
                    <View style={styles.like}>
                        <LikeButton
                            isActive={isLiked}
                            isLiking={isLiking}
                            onPress={this._handleLike}
                            iconSize={18}
                            style={{ paddingLeft: 10, paddingRight: 5 }}
                        />
                    </View>
                </View>
            </CommentSwipeableRow>
        );
    }
}

CommentItem.propTypes = {
    ownId: PropTypes.string,
    userId: PropTypes.string,
    activity: PropTypes.object,
    comment: PropTypes.object,
    keyValue: PropTypes.string,
    onReply: PropTypes.func,
    onEdit: PropTypes.func,
    feedType: PropTypes.string,
};

CommentItem.defaultProps = {};

// export default CommentItem;
export default withObservableStream({})(withBottomSheet(CommentItem));
