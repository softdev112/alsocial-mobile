import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { styles, TextWrap } from "./styles";
import { ArrowIcon } from "res/icons";
import ViewMoreText from "react-native-view-more-text";
import { textRenderer } from "utils";
import NavigationService from "service/Navigation";
import MixpanelService from "service/Mixpanel";
import { Main } from "utils/navigation";
import _ from "lodash";
import { NormalText, DescriptionText, TealText } from "../../themed";
import R from "res/R";
import { withTheme } from "styled-components";
import { IconWrap } from "../../icons";
import getFeedGroup from "utils/getFeedGroup";

class MoreText extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return !_.isEqual(nextProps, this.props);
    }

    onPressMention = (username: string) => {
        const { owner, profileId, mentions } = this.props;
        let id = null;
        if (mentions) {
            id = mentions[username];
        }
        if (id) {
            if (profileId === id) {
                return;
            }

            if (owner._id === id) {
                NavigationService.navigate(Main.Profile);
            } else {
                NavigationService.push(Main.User, { profileId: id, username });
            }
        } else {
            if (username === owner.username) {
                NavigationService.navigate(Main.Profile);
            } else {
                NavigationService.push(Main.User, { mention: username });
            }
        }
    };

    onPressHashtag = (hashtag: string) => {
        const { currentHashTag, activity, feedType, isBio, user } = this.props;
        const validHashtag = hashtag.trim().replace(/[^#a-zA-Z0-9\s]+/g, "");

        if (!currentHashTag) {
            NavigationService.navigate("HashTag", { hashTag: validHashtag });
        } else if (currentHashTag !== validHashtag) {
            NavigationService.push("HashTag", { hashTag: validHashtag });
        }

        if (activity && !isBio) {
            const { mediaTypes, mediaProviders } = MixpanelService.checkMediaTypes(
                activity.attachments,
            );

            MixpanelService.trackEvent("hashtags", {
                first_action_taken: "click",
                second_post_type: activity.verb === "post" ? "original posts" : "reposts",
                third_media_type: activity.verb === "repost" ? "NA" : mediaTypes.mediaTypes,
                fourth_media_provider: mediaProviders,
                fifth_feed_type: getFeedGroup(feedType),
                username: activity.actor.data.username,
                link: `allsocial.com/${activity.actor.id}/${activity.id}`,
            });
        } else if (isBio) {
            MixpanelService.trackEvent("hashtags", {
                first_action_taken: "click",
                second_post_type: "profile bio",
                third_media_type: "NA",
                fourth_media_provider: "NA",
                fifth_feed_type: "profile",
                username: user.username,
                link: `allsocial.com/${user._id}`,
            });
        }
    };

    renderViewMore = (onPress: Function) => (
        <TouchableOpacity style={styles.moreContainer} onPress={onPress}>
            <DescriptionText style={styles.more}>see more</DescriptionText>
            <IconWrap Icon={ArrowIcon} direction='down' />
        </TouchableOpacity>
    );

    renderViewLess = (onPress: Function) => (
        <TouchableOpacity style={styles.moreContainer} onPress={onPress}>
            <DescriptionText style={styles.more}>see less</DescriptionText>
            <ArrowIcon direction='up' />
        </TouchableOpacity>
    );

    render() {
        const { text, isMore, theme } = this.props;
        if (!text || text === "") return null;
        const renderedText = textRenderer(
            text,
            this.onPressMention,
            this.onPressHashtag,
            NormalText,
            TealText,
        );
        return isMore ? (
            <ViewMoreText
                numberOfLines={4}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
                textStyle={{ ...R.themedStyles(theme).text.normal, lineHeight: 24 }}
            >
                <TextWrap>{renderedText}</TextWrap>
            </ViewMoreText>
        ) : (
            <TextWrap>{renderedText}</TextWrap>
        );
    }
}

MoreText.propTypes = {
    user: PropTypes.object,
    profileId: PropTypes.string,
    mentions: PropTypes.object,
    text: PropTypes.string,
    currentHashTag: PropTypes.string,
    isMore: PropTypes.bool,
};

MoreText.defaultProps = {
    profileId: null,
    mentions: null,
    isMore: true,
};

export default withTheme(MoreText);
