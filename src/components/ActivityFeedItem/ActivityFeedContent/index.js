import React, { PureComponent } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import styles, { HeaderContainerView } from "./styles";
import { AttachmentCard, AttachmentCardImage, MoreText } from "common/views";
import ActivityFeedHeader from "../ActivityFeedHeader";
import R from "res/R";
import { normalizeActivity, prepareAttachments } from "utils/helper";
import { getMentions } from "utils/mention";

class ActivityFeedContent extends PureComponent {
    state = {
        mentions: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            mentions: getMentions(props.activity),
        };
    }

    getRepostText = activity => {
        if (!activity) return null;
        return activity?.reaction?.data?.text;
    };

    _renderRepost = (activity, organicActivity, text) => {
        const { feedType } = this.props;
        if (!activity) return null;
        return (
            <>
                {text && !!text.length ? (
                    <View style={styles.content}>
                        <MoreText
                            text={text}
                            currentHashTag={this.props.currentHashTag}
                            mentions={getMentions(activity)}
                            activity={activity}
                            feedType={feedType}
                        />
                    </View>
                ) : null}
                <View style={text && !!text.length ? styles.topSpace : null} />
                <HeaderContainerView>
                    <ActivityFeedHeader
                        activity={organicActivity}
                        isReaction={true}
                        feedType={this.props.feedType}
                    />
                </HeaderContainerView>
            </>
        );
    };

    _renderText = (text, hasPrev) => {
        const { profileId, activity, feedType } = this.props;
        if (text && text !== "") {
            return (
                <View style={[styles.content, hasPrev ? styles.topSpace : null]}>
                    <MoreText
                        text={text}
                        currentHashTag={this.props.currentHashTag}
                        mentions={getMentions(activity)}
                        profileId={profileId}
                        activity={activity}
                        feedType={feedType}
                    />
                </View>
            );
        }
        return null;
    };

    _renderObject = (itemId, isRepost, object, hasPrev) => {
        if (isRepost && object instanceof Object) {
            return (
                <View style={hasPrev ? styles.topSpace : null}>
                    <AttachmentCard
                        {...object.data}
                        itemId={itemId}
                        feedType={this.props.feedType}
                    />
                </View>
            );
        }
        return null;
    };

    _renderAttachments = (itemId, attachments, hasPrev) => {
        let isFirst = !hasPrev;
        const { onModalImages, isChild, feedType, activity } = this.props;
        return attachments.map((e, i) => {
            if (e.content) {
                const style = isFirst ? null : styles.topSpace;
                isFirst = false;
                switch (e.type) {
                    case "og":
                        return (
                            <View style={style} key={i}>
                                <AttachmentCard
                                    {...e.content}
                                    isChild={isChild}
                                    itemId={itemId}
                                    feedType={feedType}
                                    activity={activity}
                                />
                            </View>
                        );
                    case "images":
                        return (
                            <View style={style} key={i}>
                                <TouchableWithoutFeedback onPress={() => onModalImages(e.content)}>
                                    <View>
                                        <AttachmentCardImage imageUri={e.content} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        );
                }
            }
            return null;
        });
    };

    _renderContent = (itemId, activity, isRepost, hasRepostText) => {
        activity = normalizeActivity(activity);
        let { text } = activity;
        if (text === undefined) {
            if (typeof activity.object === "string") {
                text = activity.object;
            } else {
                text = "";
            }
        }
        text = text.trim();
        const attachments = prepareAttachments(activity.attachments);

        let hasPrev = hasRepostText;
        const renderedText = this._renderText(text);
        hasPrev = hasPrev || renderedText !== null;
        const renderedObject = this._renderObject(itemId, isRepost, activity.object, hasPrev);
        hasPrev = hasPrev || renderedObject !== null;
        const renderedAttachments = this._renderAttachments(itemId, attachments, hasPrev);
        return (
            <>
                {renderedText}
                {renderedObject}
                {renderedAttachments}
            </>
        );
    };

    render() {
        const { activity, editing } = this.props;
        const isRepost = activity.verb === R.strings.repost;
        const organicActivity = isRepost ? activity.object : activity;
        const repostText = isRepost ? this.getRepostText(activity) : null;
        return (
            <View style={styles.container}>
                {editing
                    ? null
                    : isRepost
                    ? this._renderRepost(activity, organicActivity, repostText)
                    : null}
                {this._renderContent(activity.id, organicActivity, isRepost, repostText !== null)}
            </View>
        );
    }
}

ActivityFeedContent.propTypes = {
    activity: PropTypes.object.isRequired,
    userId: PropTypes.string,
    profileId: PropTypes.string,
    currentHashTag: PropTypes.string,
    onModalImages: PropTypes.func,
    feedType: PropTypes.string,
    isChild: PropTypes.bool,
    editing: PropTypes.bool,
};

ActivityFeedContent.defaultProps = {
    editing: false,
};

export default ActivityFeedContent;
