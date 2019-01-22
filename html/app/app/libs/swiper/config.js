var fileUrl = document.currentScript.src;
var __dir__ = fileUrl.substring(0, fileUrl.lastIndexOf("/"));

app.async = function(){
   return app.loadManifest({
        css: [__dir__+"/swiper.min.css"],
        script:[__dir__+"/swiper.min.js"]
    });
}