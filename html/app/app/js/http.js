// 注册http接口
app.model({
    name: "http",
    // get方法
    get: function(path, data, sucFn, errFn) {
        Http.get({
            root: app.config.url,
            path: path,
            data: data || {},
            sucFn: function(data) {
                var json = JSON.parse(data);
                if (json.errcode == 10000) {
                    sucFn(json);
                } else {
                    if (errFn)
                        errFn(json);
                    app.toast.show(json.msg);
                }
            },
            errFn: errFn
        });
    },
    //post方法
    post: function(path, data, sucFn, errFn) {
        Http.post({
            root: app.config.url,
            path: path,
            data: data || {},
            sucFn: function(data) {
                var json = JSON.parse(data);
                if (json.errcode == 10000) {
                    sucFn(json);
                } else {
                    if (errFn)
                        errFn(json);
                    app.toast.show(json.msg);
                }
            },
            errFn: errFn
        });
    },
});