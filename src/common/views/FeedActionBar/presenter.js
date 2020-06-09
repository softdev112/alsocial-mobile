import React, { Component } from "react";
import { View, Platform, Alert } from "react-native";
import PropTypes from "prop-types";
import { styles, Container, ReactionContainer, CountsLabelContainer } from "./styles";
import { LikeButton, CommentButton, ShareButton, RepostButton } from "../../buttons";
import reactionButtonStyle from "../../buttons/ReactionButton/styles";
import { CountsLabel } from "../../labels";
import R from "res/R";
import NavigationService from "service/Navigation";
import { Main } from "utils/navigation";
import { getShareableContent } from "utils/helper";
import getFeedGroup from "utils/getFeedGroup";
import Share from "react-native-share";
import _ from "lodash";
import withObservableStream from "observable/withObservableStream";
import activityObservables from "observable/activity";
import MixpanelService from "service/Mixpanel";
import { BranchEvent } from "react-native-branch";
import { withBottomSheet } from "components/BottomSheet";

class FeedActionBar extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return (
            nextProps.activity?.id === this.props.activity?.id &&
            (nextProps.activity.refresh ||
                nextProps.activity?.isReposting !== this.props.activity?.isReposting ||
                !_.isEqual(
                    nextProps.activity?.reaction_counts,
                    this.props.activity?.reaction_counts,
                ) ||
                nextProps.activity?.isLiking !== this.props.activity?.isLiking ||
                nextProps.activity?.isLiked !== this.props.activity?.isLiked)
        );
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
            activityObservables.subjects.likeSubject$.subscribe(
                ({ activityId, likeCount, likeId, isLiked, status }) => {
                    const { activity } = this.props;
                    if (activity?.id !== activityId) {
                        return;
                    }

                    if (status === activityObservables.constants.LOADING) {
                        activity.isLiking = true;
                    } else {
                        activity.isLiking = false;
                        if (status === activityObservables.constants.SUCCESS) {
                            activity.likeCount = likeCount;
                            activity.likeId = likeId;
                            activity.isLiked = isLiked;
                        }
                    }
                    this.forceUpdate();
                },
            ),
        );

        subscriptions.push(
            activityObservables.subjects.commentSubject$.subscribe(
                ({ activity, comment, status }) => {
                    const { activity: prevActivity } = this.props;
                    if (
                        status === activityObservables.constants.SUCCESS &&
                        activity?.id === prevActivity?.id
                    ) {
                        prevActivity.commentCount = activity.commentCount;
                        this.forceUpdate();
                    }
                },
            ),
        );

        subscriptions.push(
            activityObservables.subjects.deleteCommentSubject$.subscribe(
                ({ activity, comment, status }) => {
                    const { activity: prevActivity } = this.props;
                    if (
                        status === activityObservables.constants.SUCCESS &&
                        activity?.id === prevActivity?.id
                    ) {
                        prevActivity.commentCount = activity.commentCount;
                        this.forceUpdate();
                    }
                },
            ),
        );

        subscriptions.push(
            activityObservables.subjects.repostSubject$.subscribe(
                ({ activityId, repostId, status }) => {
                    const { activity } = this.props;
                    if (activityId !== activity?.id) {
                        return;
                    }

                    activity.isReposting = status === activityObservables.constants.LOADING;
                    activity.isReposted = status === activityObservables.constants.SUCCESS;
                    if (repostId) {
                        activity.repostId = repostId;
                    }

                    this.forceUpdate();
                },
            ),
        );

        subscriptions.push(
            activityObservables.subjects.deleteRepostSubject$.subscribe(
                ({ activityId, repostId, status }) => {
                    const { activity } = this.props;
                    if (repostId !== activity?.repostId) {
                        return;
                    }

                    activity.isDeletingRepost = status === activityObservables.constants.LOADING;
                    activity.isReposted = !(status === activityObservables.constants.SUCCESS);

                    this.forceUpdate();
                },
            ),
        );
    };

    _handleLike = () => {
        const { toggleLikeActivity, activity, feedType } = this.props;
        toggleLikeActivity({
            activity,
            feedType,
        });
    };

    _onPressLikes = () => {
        const { activity } = this.props;
        NavigationService.push(Main.Like, { activityId: activity?.id });
    };

    _onPressComment = () => {
        const { activity, feedType } = this.props;
        if (feedType !== R.strings.feedType.comment) {
            NavigationService.push(Main.Comment, { activity, feedType });
        }
    };

    _shareSocial = async (type: string) => {
        const { activity, feedType } = this.props;
        const timeout = Platform.OS === "android" ? 500 : 100;
        const [message, url]: Array<string> = await getShareableContent(activity);
        const shareOptions = {
            title: "AllSocial",
            message:
                type === R.strings.socialShareType.TWITTER
                    ? `${message} #AllSocial via @AllSocialReal`
                    : `${message}`,
            url: url,
            subject: "Share All Social Post",
            excludedActivityTypes: [
                "com.apple.UIKit.activity.TypeAirDrop",
                "com.apple.UIKit.activity.TypeAddToReadingList",
                "com.apple.UIKit.activity.TypeAssignToContact",
                "com.apple.UIKit.activity.TypePostToFlickr",
                "com.apple.UIKit.activity.TypeOpenInIBooks",
                "com.apple.UIKit.activity.TypePrint",
                "com.apple.UIKit.activity.TypeSaveToCameraRoll",
                "com.apple.UIKit.activity.TypeMarkupAsPDF",
            ],
            social: type === R.strings.socialShareType.MORE ? "" : type,
        };
        try {
            setTimeout(() => {
                return (type === R.strings.socialShareType.MORE
                    ? Share.open(shareOptions)
                    : Share.shareSingle(shareOptions)
                )
                    .then(res => {
                        console.log(res);
                        MixpanelService.extractEvents(`${feedType} Feed - Share`, {
                            target_id: activity?.id,
                            target_user: activity?.actor?.id,
                        });

                        new BranchEvent(`${feedType} Feed - Share`, null, {
                            actor_id: activity?.id,
                            target_user: activity?.actor?.id,
                        }).logEvent();
                    })
                    .catch(err => {
                        err && console.log(err);
                    });
            }, timeout);
        } catch (error) {
            Alert.alert("", error.message);
        }
    };

    _onPressReshare = () => {
        const options = ["Share with Facebook", "Share with Twitter", "Share More ...", "Cancel"];
        const cancelButtonIndex = 3;
        const { showBottomSheet, activity, feedType } = this.props;

        const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(
            activity.attachments,
        );

        showBottomSheet(
            {
                options,
                cancelButtonIndex,
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    this._shareSocial(R.strings.socialShareType.FACEBOOK);

                    MixpanelService.trackEvent("shares", {
                        first_action_taken: "facebook share",
                        second_post_type: activity.verb === "post" ? "original posts" : "reposts",
                        third_media_type: activity.verb === "repost" ? "NA" : mediaTypes,
                        fourth_media_provider: mediaProviders,
                        fifth_feed_type: getFeedGroup(feedType),
                    });
                } else if (buttonIndex === 1) {
                    this._shareSocial(R.strings.socialShareType.TWITTER);

                    MixpanelService.trackEvent("shares", {
                        first_action_taken: "twitter share",
                        second_post_type: activity.verb === "post" ? "original posts" : "reposts",
                        third_media_type: activity.verb === "repost" ? "NA" : mediaTypes,
                        fourth_media_provider: mediaProviders,
                        fifth_feed_type: getFeedGroup(feedType),
                    });
                } else if (buttonIndex === 2) {
                    this._shareSocial(R.strings.socialShareType.MORE);
                }
            },
        );
    };

    _onPressRepost = () => {
        const { activity, organicActivity, showBottomSheet } = this.props;
        const isReposted = activity?.isReposted;
        const options = isReposted
            ? ["Undo repost", "Cancel"]
            : ["Repost", "Repost with comment", "Cancel"];
        const cancelButtonIndex = isReposted ? 1 : 2;

        showBottomSheet(
            {
                options,
                cancelButtonIndex,
            },
            buttonIndex => {
                if (isReposted) {
                    if (buttonIndex === 0) {
                        this._onDeleteRepost();
                    }
                } else {
                    if (buttonIndex === 0) {
                        this._onRepost();
                    } else if (buttonIndex === 1) {
                        NavigationService.push(Main.Repost, {
                            activity: organicActivity,
                        });
                    }
                }
            },
        );
    };

    _onRepost = () => {
        const { organicActivity, repostRequest } = this.props;
        repostRequest({ activity: organicActivity });
    };

    _onDeleteRepost = () => {
        const { activity, deleteRepostRequest } = this.props;
        if (activity?.repostId) {
            deleteRepostRequest(activity);
        }
    };

    render() {
        const { activity, ownPost } = this.props;
        const {
            isLiking,
            isReposting,
            isDeletingRepost,
            isReposted,
            isLiked,
            likeCount,
            commentCount,
            isPublicPost,
        } = activity;

        return (
            <Container>
                <ReactionContainer>
                    <LikeButton isActive={isLiked} isLiking={isLiking} onPress={this._handleLike} />
                    <CommentButton onPress={this._onPressComment} />
                    <ShareButton onPress={this._onPressReshare} />
                    {isPublicPost || ownPost ? (
                        <RepostButton
                            isReposted={isReposted}
                            onPress={this._onPressRepost}
                            isLoading={isReposting || isDeletingRepost}
                        />
                    ) : (
                        <View style={reactionButtonStyle.reaction}>
                            <View style={R.palette.button.invisible.reaction} />
                        </View>
                    )}
                </ReactionContainer>
                <CountsLabelContainer>
                    <CountsLabel
                        counts={likeCount}
                        label={R.strings.like}
                        style={styles.leftLabel}
                        onPress={this._onPressLikes}
                    />
                    <CountsLabel
                        counts={commentCount}
                        label={R.strings.comment}
                        style={styles.rightLabel}
                        onPress={this._onPressComment}
                    />
                </CountsLabelContainer>
            </Container>
        );
    }
}

FeedActionBar.propTypes = {
    activity: PropTypes.object.isRequired,
    actor: PropTypes.object,
    organicActivity: PropTypes.object,
    ownPost: PropTypes.bool,
    isChild: PropTypes.bool,
    containerStyle: PropTypes.object,
    feedType: PropTypes.string,
};

FeedActionBar.defaultProps = {
    containerStyle: {},
};

// export default FeedActionBar;
export default withObservableStream({})(withBottomSheet(FeedActionBar));
