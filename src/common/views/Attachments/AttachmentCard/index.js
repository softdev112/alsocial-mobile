import React, { PureComponent } from "react";
import { View, Text, TouchableWithoutFeedback, Linking } from "react-native";
import styles from "./styles";
import { sanitizeURL } from "utils/helper";
import getFeedGroup from "utils/getFeedGroup";
import AttachmentCardImage from "../AttachmentCardImage";
import AttachmentCardVideo from "../AttachmentCardVideo";
import R from "res/R";
import InAppBrowser from "react-native-inappbrowser-reborn";
import MixpanelService from "service/Mixpanel";
import Reactotron from "service/Reactotron";
import { withTheme } from "styled-components";

class AttachmentCard extends PureComponent {
    openLink = async (url: string, videos, feedType, activity) => {
        const mediaProviders = [];

        videos.forEach(video => {
            ["youtube", "twitter", "facebook", "instagram"].forEach(provider => {
                video.url.includes(provider) && mediaProviders.push(provider);
            });

            !video.url.includes("youtube") &&
                !video.url.includes("twitter") &&
                !video.url.includes("facebook") &&
                !video.url.includes("instagram") &&
                mediaProviders.push("other");
        });

        if (!mediaProviders.length) mediaProviders.push("original/ours");

        MixpanelService.trackEvent("video play", {
            second_post_type: activity.verb === "post" ? "original posts" : "reposts",
            third_media_type: "videos",
            fourth_media_provider: [...new Set(mediaProviders)].sort().join(" "),
            fifth_feed_type: getFeedGroup(feedType),
            username: activity.actor.data.username,
            link: `allsocial.com/${activity.actor.id}/${activity.id}`,
        });

        try {
            if (await InAppBrowser.isAvailable()) {
                await InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: "cancel",
                    preferredBarTintColor: R.colors.white,
                    preferredControlTintColor: R.colors.black,
                    readerMode: false,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: R.colors.white,
                    secondaryToolbarColor: R.colors.black,
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: "slide_in_right",
                        startExit: "slide_out_left",
                        endEnter: "slide_in_right",
                        endExit: "slide_out_left",
                    },
                });
            } else Linking.openURL(url);
        } catch (error) {
            console.log(error);
        }
    };

    showErrorAndOpenLink = async payload => {
        const { videos, feedType, activity } = this.props;
        const { preErrorText, error, link } = payload;
        preErrorText && Reactotron.error(preErrorText);
        error && Reactotron.error(error);
        link && this.openLink(link, videos, feedType, activity);
    };

    linkHandler = async url => {
        const { videos, feedType, activity } = this.props;

        if (url) {
            if (
                url.indexOf("https://www.facebook.com") === 0 ||
                url.indexOf("https://facebook.com") === 0 ||
                url.indexOf("https://m.facebook.com") === 0
            ) {
                Linking.canOpenURL(`fb://facewebmodal/f?href=${url}`)
                    .then(supported => {
                        if (supported) {
                            Linking.openURL(`fb://facewebmodal/f?href=${url}`).catch(error => {
                                this.showErrorAndOpenLink({
                                    preErrorText: "Open Facebook link error",
                                    link: url,
                                    error,
                                });
                            });
                        } else {
                            this.showErrorAndOpenLink({
                                preErrorText: "Can't open facebook link in fb app",
                                link: url,
                                error: {},
                            });
                        }
                    })
                    .catch(error => {
                        this.showErrorAndOpenLink({
                            preErrorText: "URL is not supported",
                            link: url,
                            error,
                        });
                    });
            } else {
                this.openLink(url, videos, feedType, activity);
            }
        }
    };
    trimUrl = url => {
        return url !== undefined || url !== null
            ? url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0]
            : undefined;
    };
    _onPressCard = () => {
        const { videos, type, url, feedType, activity } = this.props;
        if (type && type.includes("video") && videos) {
            this.openLink(url, videos, feedType, activity);
        } else {
            this.linkHandler(url);
        }
    };

    _renderContent = (title, url, description) => {
        const { theme } = this.props;
        return title || url || description ? (
            <View style={styles.descriptionContainer}>
                {title && (
                    <View>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode={"tail"}
                            style={R.themedStyles(theme).card.title}
                        >
                            {title}
                        </Text>
                    </View>
                )}
                {url && (
                    <View style={styles.space}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode={"tail"}
                            style={R.themedStyles(theme).card.url}
                        >
                            {this.trimUrl(url)}
                        </Text>
                    </View>
                )}
                {description && (
                    <View style={styles.space}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode={"tail"}
                            style={R.themedStyles(theme).card.description}
                        >
                            {description}
                        </Text>
                    </View>
                )}
            </View>
        ) : null;
    };
    render() {
        const { images, videos, type, title, description, isChild, itemId } = this.props;
        let { image } = this.props;

        if (!image && images && images.length) {
            image = images[0].image;
        }

        const url = sanitizeURL(this.props.url);
        const isVideo = /video/.test(type) && videos && !!videos.length;

        return isVideo ? (
            <View>
                <AttachmentCardVideo
                    video={videos[0]}
                    videoUri={url}
                    itemId={itemId}
                    imageUri={image}
                />
                <TouchableWithoutFeedback
                    style={styles.flex}
                    onPress={isChild ? null : this._onPressCard}
                >
                    {this._renderContent(title, url, description)}
                </TouchableWithoutFeedback>
            </View>
        ) : (
            <TouchableWithoutFeedback
                style={styles.flex}
                onPress={isChild ? null : this._onPressCard}
            >
                <View>
                    {image ? <AttachmentCardImage imageUri={image} /> : null}
                    {this._renderContent(title, url, description)}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default withTheme(AttachmentCard);
