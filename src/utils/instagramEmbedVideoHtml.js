import qs from "query-string";
import { fetchInstagram } from "./instagram";

export function isInstagramVideo(parsedUrl) {
    return parsedUrl.host === "www.instagram.com";
}

async function fetchEmbed(url) {
    const { html } = await fetchInstagram("oembed", {
        params: {
            url,
            hidecaption: true,
            omitscript: true,
        },
    });
    return html;
}

export const instagramEmbedHtml = (src, width, height) => {
    return `
<!DOCTYPE html>
<html>
  <head>
    <style>body{margin:0; background-color: black;}</style>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <iframe src=${src}
        allow="autoplay; encrypted-media;"
        allowfullscreen
        width="${width}"
        height="${height}"
        frameborder="0"
        autoplay="yes"
        scrolling="no">
    </iframe>
   <script>
       function pauseVideo() {
        }
        
        function destroy() {
        }
    </script>
</body>
</html>
    `;
};
