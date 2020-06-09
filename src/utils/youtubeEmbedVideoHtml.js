export const youtubeEmbedHtml = (videoId, width, height) => {
    return `
    <!DOCTYPE html>
<html>
  <head>
     <style>body{margin:0; background-color: black;}</style>
     <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <div id="player"></div>

    <script>
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '${height}',
          width: '${width}',
          videoId: '${videoId}',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
          player.seekTo(0);
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
    </script>
  </body>
</html>
    `;
    //     return `
    // <!DOCTYPE html>
    // <html>
    //   <head>
    //     <style>body{margin:0}</style>
    //     <meta name="viewport" content="width=device-width, initial-scale=1">
    //   </head>
    //   <body>
    //     <iframe id="iframe-player"
    //         width="${width}" height="${height}"
    //         src="https://www.youtube.com/embed/${videoId}?loop=0&autoplay=1&modestbranding=1&playsinline=0&showinfo=1&rel=0&controls=1&fs=1&enablejsapi=1"
    //         frameborder="0"
    //         allow="autoplay;encrypted-media"
    //         webkitallowfullscreen mozallowfullscreen allowfullscreen
    //         include
    //     ></iframe>
    //
    //     <script>
    //       var tag = document.createElement('script');
    //
    //       tag.src = 'https://www.youtube.com/iframe_api';
    //       var firstScriptTag = document.getElementsByTagName('script')[0];
    //       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //
    //       var player;
    //       function onYouTubeIframeAPIReady() {
    //         player = new YT.Player('iframe-player', {
    //           events: {
    //             'onReady': onPlayerReady,
    //             'onStateChange': onPlayerStateChange,
    //             'onFullscreenChange': onPlayerFullscreenChange,
    //           }
    //         });
    //         // window.player = player;
    //       }
    //       var isReady = false;
    //       function onPlayerReady(event) {
    //         window.ReactNativeWebView.postMessage("ready");
    //         isReady = true;
    //         event.target.playVideo();
    //       }
    //       function onPlayerStateChange(event) {
    //           if (event.data === YT.PlayerState.ENDED) {
    //               player.seekTo(0);
    //               player.stopVideo();
    //           }
    //           window.ReactNativeWebView.postMessage("${videoId}" + ":" + event.data)
    //       }
    //       function playVideo() {
    //           if (isReady) {
    //               player.playVideo();
    //           }
    //       }
    //       function stopVideo() {
    //           if (isReady) {
    //             player.stopVideo();
    //           }
    //       }
    //       function pauseVideo() {
    //           if (isReady) {
    //             player.pauseVideo();
    //           }
    //       }
    //       function destroy() {
    //           if (isReady) {
    //             player.destroy();
    //           }
    //       }
    //       //function to be run when full screen is closed
    //         function onPlayerFullscreenChange(event){
    //             window.ReactNativeWebView.postMessage(JSON.stringify(event.data));
    //         }
    //     </script>
    //   </body>
    // </html>
    //     `;
};
