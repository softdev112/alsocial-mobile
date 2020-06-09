import URL from "url-parse";
import { Platform } from "react-native";
import { embedVideoHtml } from "./embedVideoHtml";

const showFallbackPost = url => {
    const parsedUrl = new URL(url);
    const pathFormat = parsedUrl.pathname.split("/").filter(Boolean);

    if (pathFormat.includes("posts")) {
        return true;
    }
    return parsedUrl.host === "m.facebook.com";
};

const isSecureVideo = url => {
    const parsedUrl = new URL(url);
    return parsedUrl.host.includes("xx.fbcdn.net");
};

export const facebookEmbedHtml = (videoUri, width, height) => {
    if (isSecureVideo(videoUri)) {
        return embedVideoHtml(videoUri, width, height);
    } else {
        const className = showFallbackPost(videoUri) ? "fb-post" : "fb-video";
        return `
<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
    body{
        margin:0; 
        background-color: black; 
    }
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>

  <!-- Load Facebook SDK for JavaScript -->
  <script>
    var fb_video_player;
    var playEventHandler;
    var pauseEventHandler;
    var isReady = false;
    window.fbAsyncInit = function() {
      FB.init({
        xfbml      : true,  
        version    : 'v4.0'
      });

      // Get Embedded Video Player API Instance
      FB.Event.subscribe('xfbml.ready', function(msg) {
        if (msg.type === 'video') {
          fb_video_player = msg.instance;
          fb_video_player.play();
          playEventHandler = fb_video_player.subscribe('startedPlaying', function(e) {
              window.ReactNativeWebView.postMessage("playing:${videoUri}");
          });
          pauseEventHandler = fb_video_player.subscribe('paused', function(e) {
              window.ReactNativeWebView.postMessage("paused:${videoUri}");
          });
          window.ReactNativeWebView.postMessage("ready");
        }
        isReady = true;
      });
    };
    
    function pauseVideo() {
      if (isReady && fb_video_player !== undefined) {
        fb_video_player.pause();
      }
    }
    
    function destroy() {
        if (isReady) {
            if (playEventHandler !== undefined){
                playEventHandler.release("startedPlaying");
            } 
            if (pauseEventHandler !== undefined) {
                pauseEventHandler.release("paused");
            }
            if (fb_video_player !== undefined) {
                fb_video_player = undefined;
            }
        } 
    }
  </script>
  <div id="fb-root">
  <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
    
  <!-- Your embedded video player code -->
  <div
    class="${className}"
    data-href="${videoUri}"
    <!-- honestly not sure why this works but it doesn't render otherwise and auto-scales with height anyways-->
    ${Platform.OS === "android" && className === "fb-video" ? "" : 'data-width="' + width + '"'}
    data-height="${height}"
    data-autoplay="true"
    data-allowfullscreen="true"></div>

</body>
</html>
    `;
    }
};
