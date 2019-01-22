var fileUrl = document.currentScript.src;
var __dir__ = fileUrl.substring(0, fileUrl.lastIndexOf("/"));

app.async = function(){
   return app.loadManifest({
        script:[__dir__+"/libs/http.js"]
    });
}