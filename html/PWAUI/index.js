var fileUrl = document.currentScript.src;
var __dir__ = fileUrl.substring(0, fileUrl.lastIndexOf("/"));

app.async = function(){
   return app.loadManifest({
        css: [__dir__+"/icon/style.css",
              __dir__+"/base.css",
              __dir__+"/color.css"],
        script: [
            __dir__+"/base.xml",
            __dir__+"/components.xml",
            __dir__+"/select.xml",
        ]
    });
}