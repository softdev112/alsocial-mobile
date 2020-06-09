import React, { PureComponent } from "react";
import { BackHandler, View } from "react-native";
import { WebView } from "react-native-webview";
import styles from "./styles";
import { youtubeEmbedHtml } from "utils/youtubeEmbedVideoHtml";
import { facebookEmbedHtml } from "utils/facebookEmbedVideoHtml";
import { twitterEmbedHtml } from "utils/twitterEmbedVideoHtml";
import { instagramEmbedHtml } from "utils/instagramEmbedVideoHtml";
import R from "res/R";
import { enterFullscreen, exitFullscreen } from "observable/video";
import { IconButton } from "common/buttons";
import { CloseIcon } from "res/icons";
import NavigationService from "service/Navigation";
import { ContainerView } from "common/themed";

class FullScreenVideoPlayer extends PureComponent {
    _webviewRef = null;
    constructor(props) {
        super(props);
        const { navigation } = props;
        const source = navigation.getParam("source", null);
        const width = R.dimensions.screen.width;
        const height = navigation.getParam("height", 0);
        this.state = {
            id: source.id,
            width,
            height,
            source: this._getSource(source, width, height),
        };
    }

    componentDidMount() {
        this.onChangeFullscreen(true);
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
            Promise.resolve(NavigationService.back()).then(() => this.backHandler.remove()),
        );
    }

    componentWillUnmount() {
        this.onChangeFullscreen(false);
        this.backHandler.remove();
        if (this._webviewRef) {
            const run = `
                destroy();
                true;
            `;
            this._webviewRef.injectJavaScript(run);
            this._webviewRef.stopLoading();
            this._webviewRef = null;
        }
    }

    onChangeFullscreen = isFullscreen => {
        if (isFullscreen) {
            enterFullscreen();
        } else {
            exitFullscreen();
        }
    };

    _getSource = (source, width, height) => {
        if (source.provider === "youtube") {
            return {
                html: youtubeEmbedHtml(source.id, width, height),
                baseUrl: "https://www.youtube.com",
            };
        } else if (source.provider === "facebook") {
            return {
                html: facebookEmbedHtml(source.id, width, height),
                baseUrl: "https://www.facebook.com",
            };
        } else if (source.provider === "twitter") {
            return {
                html: twitterEmbedHtml(source.id, width, height),
                baseUrl: "https://www.twitter.com",
            };
        } else if (source.provider === "instagram") {
            return {
                html: instagramEmbedHtml(source.id, width, height),
                baseUrl: "https://www.instagram.com",
            };
        }
        return null;
    };

    onShouldStartLoadWithRequest = navigator => {
        const { source, id } = this.state;
        const url = navigator.url;
        return !url.startsWith("http") || url === source.baseUrl || url === id || url.includes(id);
    };

    render() {
        const { source, width, height } = this.state;
        return (
            <ContainerView style={styles.container}>
                <View style={[styles.webviewContainer, { width, height }]}>
                    <WebView
                        ref={ref => {
                            this._webviewRef = ref;
                        }}
                        style={{ flex: 1, backgroundColor: R.colors.black }}
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
                        // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
                        // onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
                    />
                </View>
                <View style={styles.closeButtonContainer}>
                    <IconButton icon={<CloseIcon />} onPress={() => NavigationService.back()} />
                </View>
            </ContainerView>
        );
    }
}

FullScreenVideoPlayer.propTypes = {};

FullScreenVideoPlayer.defaultProps = {};

export default FullScreenVideoPlayer;
