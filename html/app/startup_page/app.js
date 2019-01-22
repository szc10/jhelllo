app.async().then(function () {
    // 加载启动页面
    app.dynamicLoadActivity("activity/load.html").then((str) => {
         app.loadGlobalJActivity(str).init().activite();
    })

});