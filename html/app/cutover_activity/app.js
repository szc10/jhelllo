app.async().then(function () {
    return APP.loadManifest(null, "config/m.json").then(function () {
        APP.loadJActivity(null, 'main', 'main', null).init().activite();
    });
});