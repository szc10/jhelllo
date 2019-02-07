var fileUrl = document.currentScript.src;
var __dir__ = fileUrl.substring(0, fileUrl.lastIndexOf("/"));

app.async = function(){
   return app.loadManifest({
        css: [__dir__+"/icon/style.css",
              __dir__+"/base.css",
              __dir__+"/color.css"],
        res: [
            __dir__+"/base.js",
            __dir__+"/components.js",
            __dir__+"/select.js",
        ]
    });
}