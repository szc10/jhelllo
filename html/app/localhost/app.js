

let m_config =  {
    "name": "事件响应",
    "version": "0.0.1",
    "description": "",
    "author": "jhello",
    "icon": {
     "url": "img/R2D2.png"
    },
    "script":["js/class.js","activity/main.js"],
    "asyncTask": [

        "../../PWAUI/index.js"
    ],
    "res":[ ]
};
app.loadManifest(m_config).then(function(){
    APP.loadJActivity(null, 'main', 'main', null).init().activite();
});
    