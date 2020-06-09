export const embedVideoHtml = (videoUri, width, height) => {
    return `
<html>
   <head>
      <style>body{margin:0; background-color: black;}</style>
      <meta name="viewport" content="width=device-width, initial-scale=1">
   </head>
   <body>
      <video controls="" autoplay="" fullscreen="" name="media" width="${width} height=${height}">
         <source src="${videoUri}" type="video/mp4">
      </video>
   </body>
</html>`;
};
