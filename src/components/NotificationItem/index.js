import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AttachedImages from "./AttachedImages";
import isObject from "lodash/isObject";
import styles from "./styles";
import PropTypes from "prop-types";
import { AvatarImage } from "common/images";
import R from "res/R";
import NavigationService from "service/Navigation";
import { Main } from "utils/navigation";
import { TimeLabel } from "common/labels";
import { TouchableContentView, NormalText, BoldText } from "common/themed";
import { withTheme } from "styled-components";

class NotificationItem extends PureComponent {
    getUniqueUsers = activities => {
        const ret = [];
        const users = activities.map(activity => activity.actor).filter(user => user.data);
        const uniqueUsers = users
            .map(user => user.data._id)
            .filter((v, i, a) => a.indexOf(v) === i);

        uniqueUsers.forEach(id => ret.push(users.find(user => user.data._id === id)));
        return ret;
    };

    _onPress = () => {
        const { userId, notification } = this.props;
        const { activities } = notification;
        const lastActivity = activities[0];
        let selectedActivity = lastActivity.object;

        if (
            lastActivity.verb === "follow_request" ||
            lastActivity.verb === "follow_accept" ||
            lastActivity.verb === "follow"
        ) {
            if (selectedActivity?.data?._id) {
                if (userId === selectedActivity?.data?._id) {
                    NavigationService.navigate(Main.Profile, {
                        profileId: selectedActivity?.data?._id,
                        actor: selectedActivity?.data,
                    });
                } else {
                    NavigationService.push(Main.User, {
                        profileId: selectedActivity?.data?._id,
                        actor: selectedActivity?.data,
                    });
                }
            }
        } else {
            const activity =
                lastActivity.verb === "repost" || lastActivity.verb === "post"
                    ? lastActivity
                    : lastActivity?.object;
            NavigationService.push(Main.Comment, {
                activity,
                feedType: R.strings.feedType.notification,
                isMention: this._isMention(lastActivity),
            });
        }

        if (!notification.is_seen) {
            notification.is_seen = true;
            this.forceUpdate();
        }
    };

    _isMention = activity => {
        const { username } = this.props;
        return (
            (activity.verb === "post" && activity.mentions && activity.mentions[username]) ||
            ((activity.verb === "comment" || activity.verb === "repost") &&
                activity.reaction &&
                activity.reaction.data.mentions &&
                activity.reaction.data.mentions[username])
        );
    };

    render() {
        const { notification, keyValue, theme } = this.props;
        const { activities } = notification;
        const lastActivity = activities[0];
        let lastActivityObj = lastActivity.object;

        const isMention = this._isMention(lastActivity);

        if (isMention && lastActivity.verb !== "comment") {
            lastActivityObj = lastActivity;
        }

        const uniqueActors = this.getUniqueUsers(activities);
        if (!uniqueActors || !uniqueActors.length) {
            return null;
        }

        let headerText = null;
        const lastActor = uniqueActors[0];
        if (uniqueActors.length === 1) headerText = lastActor?.data?.username || "Unknown";
        else if (uniqueActors.length === 2) headerText = `${lastActor.data.username} and 1 other `;
        else headerText = `${lastActor.data.username} and ${uniqueActors.length - 1} others `;

        let times = " ";
        if (uniqueActors.length === 1 && activities.length > 1) {
            if (lastActivity.verb === "comment") times = ` ${activities.length} times `;
            else if (lastActivity.verb === "comment_like") times = ` ${activities.length} of `;
        }

        let headerSubtext = null;
        if (lastActivity.verb === "like") headerSubtext = `liked your ${lastActivityObj.verb}`;
        else if (isMention) headerSubtext = `mentioned you in a ${lastActivity.verb}`;
        else if (lastActivity.verb === "repost")
            headerSubtext = `reposted your ${lastActivityObj.verb}`;
        else if (lastActivity.verb === "follow") headerSubtext = "followed you";
        else if (lastActivity.verb === "follow_request") headerSubtext = "requested to follow you";
        else if (lastActivity.verb === "follow_accept")
            headerSubtext = "accepted your follow request";
        else if (lastActivity.verb === "comment")
            headerSubtext = `commented${times}on your ${lastActivityObj.verb}`;
        else if (lastActivity.verb === "comment_like")
            headerSubtext = `liked${times}your comment${times !== " " ? "s" : ""}`;
        else return null;

        const isFollow = lastActivity.verb.includes("follow");
        if (!isFollow && lastActivityObj.actor.error) return null;

        const { images, og } = { ...lastActivityObj.attachments };
        const hasImages =
            (images && !!images.length) ||
            (og && !!og.length) ||
            (isObject(og) && og.images && !!og.images[0]);

        return (
            <TouchableContentView key={keyValue} onPress={this._onPress}>
                <View style={styles.container}>
                    <View style={styles.avatar}>
                        <AvatarImage
                            size={R.dimensions.image.avatar.normal}
                            actorId={lastActor?.data?._id}
                            actor={lastActor?.data}
                            type={`{R.strings.feedType.notification} Feed`}
                        />
                    </View>
                    <View style={styles.contentWrapper}>
                        <View style={styles.content}>
                            <Text style={styles.contentText}>
                                {headerText && (
                                    <BoldText style={styles.contentText}>{headerText}</BoldText>
                                )}
                                {headerSubtext && (
                                    <NormalText style={styles.contentText}>
                                        {" "}
                                        {headerSubtext}
                                    </NormalText>
                                )}
                                {`  `}
                                <TimeLabel
                                    time={notification.updated_at}
                                    type={R.strings.timeType.SHORT}
                                    style={styles.contentText}
                                />
                            </Text>
                        </View>
                        {hasImages && <AttachedImages activity={lastActivityObj} />}
                    </View>
                </View>
            </TouchableContentView>
        );
    }
}

NotificationItem.propTypes = {
    ownId: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
    notification: PropTypes.object,
    keyValue: PropTypes.string,
};

export default withTheme(NotificationItem);
