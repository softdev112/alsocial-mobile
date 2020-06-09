import React, { Component } from "react";
import { View, Platform, Alert } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { EllipsisIcon } from "res/icons";
import { UserItem } from "common/views";
import { IconButton } from "common/buttons";
import { IconWrap } from "common/icons";
import { TimeLabel } from "common/labels";
import R from "res/R";
import { FollowButton } from "common/buttons";
import NavigationService from "service/Navigation";
import { Main } from "utils/navigation";
import { withTheme } from "styled-components";
import { withBottomSheet } from "components/BottomSheet";

class ActivityFeedHeader extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return (
            nextProps.isDeleting !== this.props.isDeleting ||
            nextProps.ownerUsername !== this.props.ownerUsername
        );
    }

    _flagActivity = () => {
        const types = R.strings.reportTypes;
        const options = [...types.map(type => type.value), "Cancel"];
        const cancelButtonIndex = options.length - 1;
        const destructiveButtonIndex = options.length - 1;
        const timeout = Platform.OS === "android" ? 1500 : 100;
        const { showBottomSheet } = this.props;

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
                                const { reportRequest, activity } = this.props;

                                reportRequest({
                                    activity,
                                    typeReport,
                                });
                            }
                        }
                    },
                ),
            timeout,
        );
    };

    getRepostText = activity => {
        if (!activity) return null;
        return activity?.reaction?.data?.text;
    };

    _editActivity = () => {
        const { activity, isRepost, organicActivity } = this.props;
        if (isRepost) {
            NavigationService.push(Main.Repost, {
                activity,
                editing: true,
                text: this.getRepostText(activity),
            });
        } else {
            NavigationService.push(Main.Post, {
                action: R.constants.post.text,
                activity: organicActivity,
                editing: true,
            });
        }
    };

    _deleteActivity = () => {
        Alert.alert("Are you sure you want to delete this post?", "", [
            { text: "Cancel" },
            {
                text: "OK",
                onPress: () => {
                    const { activity, deleteRequest } = this.props;

                    deleteRequest(activity);
                },
            },
        ]);
    };

    _onOpenActionSheet = () => {
        const { showBottomSheet } = this.props;
        const {
            userId,
            activity: {
                actor: { id },
            },
        } = this.props;
        const isMyActivity = userId === id;
        let options = [];
        if (isMyActivity) {
            options = ["Edit", "Delete", "Cancel"];
        } else {
            options = ["Report", "Cancel"];
        }
        const destructiveButtonIndex = isMyActivity ? 1 : undefined;
        const cancelButtonIndex = isMyActivity ? 2 : 1;

        showBottomSheet(
            {
                options,
                cancelButtonIndex,
            },
            buttonIndex => {
                if (!isMyActivity && buttonIndex === 0) {
                    this._flagActivity();
                } else if (isMyActivity && buttonIndex === 0) {
                    this._editActivity();
                } else if (isMyActivity && buttonIndex === 1) {
                    this._deleteActivity();
                }
            },
        );
        // BottomSheet.showBottomSheetWithOptions(
        //     {
        //         options,
        //         cancelButtonIndex,
        //         destructiveButtonIndex,
        //     },
        //     buttonIndex => {
        //         if (!isMyActivity && buttonIndex === 0) {
        //             this._flagActivity();
        //         } else if (isMyActivity && buttonIndex === 0) {
        //             this._editActivity();
        //         } else if (isMyActivity && buttonIndex === 1) {
        //             this._deleteActivity();
        //         }
        //     },
        // );
    };

    _onPressTimestamp = () => {
        const { activity, feedType } = this.props;
        if (feedType !== R.strings.feedType.comment) {
            NavigationService.push(Main.Comment, { activity, feedType });
        }
    };

    render() {
        const {
            activity,
            isReaction,
            profileId,
            isChild,
            isDeleting,
            isRepost,
            feedType,
            theme,
            ownerId,
            ownerUsername,
        } = this.props;
        const isShowFollow = feedType === R.strings.feedType.explore;
        const { actor, time } = activity;
        let user = null;
        let userId = "";
        const maxWidth = R.dimensions.screen.width - (isShowFollow ? 210 : 140);
        if (!actor || !actor.data) {
            user = <UserItem />;
        } else {
            const {
                data: { _id, avatar, profileImage, username },
            } = actor;
            userId = _id;
            user = (
                <UserItem
                    actorId={_id}
                    actor={actor}
                    profileId={profileId}
                    username={userId === ownerId ? ownerUsername : username}
                    usernameStyle={{
                        maxWidth,
                    }}
                    avatar={profileImage && profileImage !== "" ? profileImage : avatar}
                    isRepost={isRepost}
                    type={`${feedType} Feed`}
                    style={{ paddingLeft: 15 }}
                />
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    {user}
                    <View style={styles.time}>
                        <TimeLabel
                            time={time}
                            type={R.strings.timeType.SHORT}
                            onPress={this._onPressTimestamp}
                        />
                    </View>
                    {isShowFollow && (
                        <View style={styles.followButton}>
                            <FollowButton
                                userId={userId}
                                feedType={feedType}
                                isShow={isShowFollow}
                                followStatus={
                                    actor && actor.data
                                        ? {
                                              following: actor.following || false,
                                              follower: actor.follower || false,
                                          }
                                        : null
                                }
                                type={"text"}
                                style={{ paddingLeft: 0, paddingRight: 0 }}
                                loadingIndicatorColor={theme.color.teal}
                                activity={activity}
                            />
                        </View>
                    )}
                </View>
                {!isChild && !isReaction && (
                    <IconButton
                        icon={<IconWrap Icon={EllipsisIcon} width={17} height={5} />}
                        onPress={this._onOpenActionSheet}
                        isLoading={isDeleting}
                        style={{
                            height: "100%",
                            paddingLeft: 30,
                            paddingRight: 14,
                            width: "auto",
                        }}
                    />
                )}
            </View>
        );
    }
}

ActivityFeedHeader.propTypes = {
    activity: PropTypes.object,
    organicActivity: PropTypes.object,
    userId: PropTypes.string,
    profileId: PropTypes.string,
    isRepost: PropTypes.bool,
    isReaction: PropTypes.bool,
    isChild: PropTypes.bool,
    isDeleting: PropTypes.bool,
    feedType: PropTypes.string,
};

ActivityFeedHeader.defaultProps = {
    profileId: null,
    isRepost: false,
    isChild: false,
    isDeleting: false,
};
export default withTheme(withBottomSheet(ActivityFeedHeader));
