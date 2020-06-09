import React, { PureComponent } from "react";
import { View, Platform } from "react-native";
import styles from "./styles";
import R from "res/R";
import PropTypes from "prop-types";
import urlParser from "js-video-url-parser";
import { IconButton } from "common/buttons";
import { PlayIcon } from "res/icons";
import { enterFullscreen, exitFullscreen } from "observable/video";
import CustomImage from "../../../images/CustomImage";
import { WebView } from "react-native-webview";
import qs from "query-string";
import activityObservables from "observable/activity";
import withObservableStream from "observable/withObservableStream";
import { NavigationEvents } from "react-navigation";
import NavigationService from "service/Navigation";
import { Main } from "utils/navigation";
import { withTheme } from "styled-components";

class AttachmentCardVideo extends PureComponent {
    _webviewRef: ?WebView = null;

    state = {
        source: null,
        width: 0,
        height: 0,
        isViewed: false,
        video: null,
        imageUri: null,
    };

    constructor(props) {
        super(props);
        const { imageUri, video } = this.props;

        const containerWidth = R.dimensions.screen.width;
        let containerHeight = 0;
        if (video) {
            const { width, height } = video;
            if (width && width > 0 && height && height > 0) {
                containerHeight = (height * containerWidth) / width;
            }
        }
        this.state = {
            source: null,
            width: containerWidth,
            height: containerHeight,
            video,
            imageUri,
        };
    }

    componentDidMount(): void {
        this._setupObservables();
        // check to see if the video link is expired or working still
        if (this.props.videoUri && this.props.videoUri.includes("instagram")) {
            fetch(this.props.video.secure_url).then(res => {
                if (res && /4\d\d/.test(`${res.status}`)) {
                    this.handleOG(this.props.videoUri);
                }
            });
        }
    }

    componentWillUnmount(): void {
        if (this._webviewRef) {
            const run = `
                destroy();
                true;
            `;
            this._webviewRef.injectJavaScript(run);
            this._webviewRef.stopLoading();
            this._webviewRef = null;
        }
        this._clearObservables();
    }

    _clearObservables = () => {
        const { clearSubscriptions } = this.props;
        clearSubscriptions();
    };

    stop = async () => {
        if (this._webviewRef && this.state.isViewed) {
            const run = `
                pauseVideo();
                true;
            `;
            this._webviewRef.injectJavaScript(run);
        }
    };

    _setupObservables = () => {
        const { subscriptions, itemId } = this.props;

        subscriptions.push(
            activityObservables.subjects.viewableSubject$.subscribe(items => {
                if (!items.includes(itemId)) {
                    if (this.state.isViewed) {
                        this.stop();
                        this.setState({ isViewed: false });
                    }
                } else {
                    if (!this.state.isViewed) {
                        this.setState({ isViewed: true });
                    }
                }
            }),
        );
    };

    onChangeFullscreen = isFullscreen => {
        if (isFullscreen) {
            if (Platform.OS === "ios") {
                enterFullscreen();
            }
        } else {
            exitFullscreen();
        }
    };

    ogClient = async url => {
        const client = global.streamClient;
        return await client.og(url);
    };

    handleOG = async url => {
        try {
            const resp = await this.ogClient(url);
            if (resp && resp.images && resp.images.length && resp.videos && resp.videos.length) {
                return await this.setState({
                    ...this.state,
                    imageUri: resp.images[0].image,
                    video: resp.videos[0],
                });
            }
        } catch (e) {
            console.log({ e });
        }
    };

    _parseSource = video => {
        const { videoUri } = this.props;
        let source = urlParser.parse(videoUri);
        if (source && source.provider === "youtube") {
        } else {
            if (videoUri.includes("facebook")) {
                source = { id: encodeURI(videoUri), provider: "facebook" };
            } else if (videoUri.includes("twitter")) {
                let videoUrl = videoUri;
                if (video) {
                    const { secure_url } = video;
                    videoUrl = secure_url ? secure_url : videoUri;
                }
                const { url, query } = qs.parseUrl(videoUrl);
                const urlWithAutoplay = `${url}?${qs.stringify({ ...query, autoplay: 1 })}`;
                source = { id: encodeURI(urlWithAutoplay), provider: "twitter" };
            } else if (videoUri.includes("instagram")) {
                let videoUrl = videoUri;
                if (video) {
                    const { secure_url } = video;
                    videoUrl = secure_url ? secure_url : videoUri;
                }
                source = { id: encodeURI(videoUrl), provider: "instagram" };
            }
        }
        return source;
    };

    onShouldStartLoadWithRequest = navigator => {
        const url = navigator.url;
        if (!url.startsWith("http")) {
            return true;
        } else {
            return false;
        }
    };

    render() {
        const { source, width, height, imageUri, video } = this.state;
        const style = height > 0 ? { width: width, height: height } : null;
        const urlSource = this._parseSource(video);

        return (
            <View style={[styles.container, style, imageUri ? {} : { backgroundColor: "black" }]}>
                <NavigationEvents onWillBlur={payload => this.stop()} />
                {source ? (
                    <WebView
                        ref={ref => {
                            this._webviewRef = ref;
                        }}
                        style={{ flex: 1 }}
                        source={source}
                        originWhitelist={["*"]}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        allowsFullscreenVideo={true}
                        allowsInlineMediaPlayback={false}
                        allowsLinkPreview={true}
                        cacheEnabled={true}
                        mediaPlaybackRequiresUserAction={false}
                        scalesPageToFit={true}
                        scrollEnabled={false}
                        startInLoadingState={true}
                        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
                        onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
                    />
                ) : (
                    <>
                        {imageUri ? <CustomImage uri={imageUri} style={style} /> : null}
                        <View style={[styles.playerContainer, style]}>
                            {urlSource ? (
                                <IconButton
                                    icon={<PlayIcon />}
                                    onPress={() => {
                                        NavigationService.navigate(Main.FullScreenVideoPlayer, {
                                            source: urlSource,
                                            height: this.state.height,
                                        });
                                    }}
                                />
                            ) : null}
                        </View>
                    </>
                )}
            </View>
        );
    }
}

AttachmentCardVideo.propTyps = {
    itemId: PropTypes.string,
    isViewable: PropTypes.bool,
    videoUri: PropTypes.string,
    video: PropTypes.object,
    imageUri: PropTypes.string,
};

AttachmentCardVideo.defaultProps = {
    isViewable: true,
    videoUri: null,
    video: null,
    imageUri: null,
};
// export default AttachmentCardVideo;
export default withObservableStream({})(withTheme(AttachmentCardVideo));
