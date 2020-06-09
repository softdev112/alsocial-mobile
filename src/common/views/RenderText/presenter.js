import React, { Component } from "react";
import PropTypes from "prop-types";
import { textRenderer } from "utils";
import NavigationService from "service/Navigation";
import MixpanelService from "service/Mixpanel";
import { Main } from "utils/navigation";
import _ from "lodash";
import { NormalText, TealText, BoldText } from "../../themed";
import { TextWrap } from "./styles";
import getFeedGroup from "utils/getFeedGroup";

class RenderText extends Component {
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
        const { currentHashTag, activity, feedType } = this.props;
        const validHashtag = hashtag.trim().replace(/[^#a-zA-Z0-9\s]+/g, "");

        if (!currentHashTag) {
            NavigationService.navigate("HashTag", { hashTag: validHashtag });
        } else if (currentHashTag !== validHashtag) {
            NavigationService.push("HashTag", { hashTag: validHashtag });
        }

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
    };

    _renderUsername = username => {
        return username ? (
            <BoldText onPress={() => this.onPressMention(username)}>
                {username}
                {` `}
            </BoldText>
        ) : null;
    };

    render() {
        const { text, username, isMore } = this.props;
        if (!text || text === "") return null;
        const renderedText = textRenderer(
            text,
            this.onPressMention,
            this.onPressHashtag,
            NormalText,
            TealText,
        );
        return isMore ? (
            <TextWrap>
                {this._renderUsername(username)}
                {renderedText}
            </TextWrap>
        ) : (
            <TextWrap>{renderedText}</TextWrap>
        );
    }
}

RenderText.propTypes = {
    user: PropTypes.object,
    profileId: PropTypes.string,
    mentions: PropTypes.object,
    username: PropTypes.string,
    text: PropTypes.string,
    currentHashTag: PropTypes.string,
    isMore: PropTypes.bool,
};

RenderText.defaultProps = {
    profileId: null,
    mentions: null,
    isMore: true,
};

export default RenderText;
