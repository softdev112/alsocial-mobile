import qs from "query-string";

export const twitterEmbedHtml = (src, width, height) => {
    // const { url, query } = qs.parseUrl(src);
    // const urlWithAutoplay = `${url}?${qs.stringify({ ...query, autoplay: 0 })}`;
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
        scrolling="no"></iframe>
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
