var head = document.getElementsByTagName("head")[0];

function templateFn(html) {
    var dealHtml = html.replace(/{{=([\s\S]*?)}}/g, "');p.push($1);p.push('"); //将<%=xxx%> 替换为 ');p.push(xxx);p.push('
    dealHtml = dealHtml.replace(/{{/g, "');"); //将<% 替换为');
    dealHtml = dealHtml.replace(/}}/g, "p.push('"); //将%> 替换为p.push('
    //用p.push('')组织代码包裹起来
    dealHtml = " try { var p=[];p.push('" + dealHtml + "'); } catch (e) { console.error(e); }return p.join(''); ";
    dealHtml = dealHtml.replace(/[\r\t\n]/g, "");

    try {
        var fn = new Function('data', dealHtml);
    } catch (e) {
        console.log(e);
    }
    return fn
}

class ResMgr {
    constructor() {
        this.nodeArr = ["layout", "style", "script"];
        ResMgr.res = {};
    }
    getNodeContext(nodeName, text) {
        var r = new RegExp("<(" + nodeName + "+)(.*)?>([\\s\\S]*?)<\\/\\1>", "gm");
        var result;
        var resArr = [];
        while ((result = r.exec(text)) != null) {
            var attributestr = (result[2] || "").replace(/"/g, "").replace(/'/g, "");
            var resObj = {
                nodeName: result[1],
                text: result[3],
                attributes: {}
            };
            var attributeArr = attributestr.split(" ");

            for (var i = 0; i < attributeArr.length; i++) {
                var one = attributeArr[i];
                if (one) {
                    var arr = one.split("=");
                    resObj.attributes[arr[0]] = arr[1];
                }
            }
            resObj.id = resObj.attributes.id || null;
            resArr.push(resObj);
        }

        return resArr;
    }
    loadResForText(text) {
        var resArr = this.getNodeContext(this.nodeArr.join("|"), text);
        return resArr;
    }
    dealResArrForNodename(resArr) {
        var key = parseInt(Math.random() * 100000000);
        app.temp[key] = resArr;

        var pArr = [];

        for (var i = 0; i < resArr.length; i++) {
            var res = resArr[i];
            var text = res.text;
            if (res.id) {
                ResMgr.res[res.id] = res;
            }
            if (res.attributes["data-id"]) {
                resArr[res.attributes["data-id"]] = res;
            }
            switch (res.nodeName) {
                case "style":
                    var style = document.createElement("style");
                    style.innerHTML = text;
                    head.appendChild(style);
                    break;
                case "script":
                    text = `
                (function(resMap){
                    ${text}
                }(app.temp[${key}]));`;
                    // var blob = new Blob([text], {});
                    // var blobUrl = window.URL.createObjectURL(blob);
                    // pArr.push(loadScript(blobUrl,res.attributes));
                    pArr.push(loadJsCode(text));
                    break;
                default:
                    break;
            }
        }

        return Promise.all(pArr);
    }
}



class templateDom {
    /**
     *  创建模板Dom对象
     * @param {*} dom 建立模板的dom元素
     * @param {*} template_html // 初始化的模板的代码
     * @param {*} point //作用域的指定,默认为当前的类
     */
    constructor(dom, template_html, point) {
        this.dom = dom;
        this.point = point || this;
        this.templateFn = templateFn(template_html || dom.innerHTML);
        // this.set({});
    }
    set(data) {
        this.dom.innerHTML = this.templateFn.call(this.point, data);
    }
}

/**
 * [loadText 利用promise重新封装后的加载文本文件]
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function loadText(url) {
    return new Promise(function (resolve, reject) {
        Jajax({
            url: url,
            type: "get",
            complete: function (data) {
                resolve(data);
                // console.log(data);
            },
            error: function () {
                console.error(url + " is not exist");
                reject(url + " is not exist");
            }
        });
    });
}

/**
 * 解析xml文档
 * @param {*} text 
 */
function loadXml(text) {
    return new DOMParser().parseFromString(text, 'text/xml');
}


/**
 * 加载当前的layout文件
 * @param {*} url 
 */
function loadLayout(url) {

    if(/\.js$/.test(url)){
        return loadScript(url);
    }
    // 当前的测试用例
    return loadText(url).then(function (data) {
        return app.res(data);
        // return Promise.resolve();
    });
}


function dealLayoutType(text, type) {

    if (!type) return;
    switch (type) {
        case "text/css":
            var style = document.createElement("style");
            style.innerHTML = text;
            head.appendChild(style);
            break;
        case "text/javascript":
            text = text.replace(/&lt;/g, "<");
            text = text.replace(/&gt;/g, ">");
            var blob = new Blob([text], {
                type: type
            });
            var blobUrl = window.URL.createObjectURL(blob);
            loadScript(blobUrl);
            break;
        default:
            break;
    }
}

/**
 * 获取元素的type
 * @param {*} dom 
 */
function getXmlDomType(dom) {
    try {
        return dom.attributes.type.value;
    } catch (error) {
        return null;
    }
}

/**
 * 加载javascript脚本
 * @param {*} url 
 */
function loadScript(url,attributes) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.src = url;

        if(attributes)
        {
            for(var key in attributes){
                script[key] = attributes[key];
            }
        }

        script.onload = function () {
            resolve();
        }
        head.appendChild(script);
    });
}

function loadJsCode(text){
    return new Promise(function(resolve, reject){
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.text = text;
        script.onload = function () {
        }
        document.body.appendChild(script);
        resolve();
    });
}

/**
 * [loadScriptArr 加载脚本队列]
 * @param  {[type]} urlArr [description]
 * @return {[type]}        [description]
 */
function loadScriptArr(urlArr) {
    if (urlArr) {
        var length = urlArr.length;
        return new Promise(function (resolve, reject) {
            _loadScript(0)

            function _loadScript(num) {
                if (num < length) {
                    var url = urlArr[num]+"?v="+app.version;
                    loadScript(url).then(function () {
                        num++;
                        _loadScript(num);
                    });
                } else {
                    resolve();
                }
            }
        });
    } else {
        return Promise.resolve();
    }
}

function loadCSS(url) {
    return new Promise(function (resolve, reject) {
        var linkTag = document.createElement('link');
        linkTag.href = url;
        linkTag.setAttribute('rel', 'stylesheet');
        linkTag.setAttribute('type', 'text/css');
        head.appendChild(linkTag);
        linkTag.onload = function () {
            resolve();
        }
    });
}

function loadCSSArr(urlArr) {
    if (urlArr) {

        var pArr = [];
        for (var i = 0; i < urlArr.length; i++) {
            pArr.push(loadCSS(urlArr[i]+"?v="+app.version));
        }
        // console.log(pArr);
        return Promise.all(pArr);
    } else {
        return Promise.resolve();
    }

}


//加载activity文件
function loadActivity(name) {

    var activityInf = APP.getActivityInf(name);
    var promiseArr = [];

    if (activityInf.layout.url) {
        var promiseText = loadText(activityInf.layout.url);
        promiseText.then(function (data) {
            activityInf.layout.data = data;
        });
        promiseArr.push(promiseText);
    }

    if (activityInf.script) {
        var promiseScript = loadScript(activityInf.script);
        promiseScript.then(function () {

        });
        promiseArr.push(promiseScript);
    }
    if (activityInf.css) {
        var promiseCSS = loadCSS(activityInf.css);
        promiseCSS.then(function () {

        });
        promiseArr.push(promiseScript);
    }
    return Promise.all(promiseArr);
}

function preImgCache(url) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = url;
        img.onload = function () {
            resolve();
        };
    });
}

function preImgCacheArr(urlArr) {

    if (urlArr) {
        var pArr = [];
        for (var i = 1; i < urlArr.length; i++) {
            pArr.push(preImgCache(urlArr[i]));
        }
        return Promise.all(pArr);
    } else {
        return Promise.resolve();
    }
}



var objectManager = APP = app = ((function () {
    appInf = [];
    appRunStack = {};


    appInf['activity'] = []; //当前定义的类
    appInf['layout'] = []; // 布局文件

    appInf["view_config"] = []; //当前存储的view的配置
    appInf["res"] = [];

    appInf["dynamicLoadActivityMap"] = {};




    return {
        resMgr: new ResMgr(),
        temp: {},
        create: function (_class) {
            var _object = {}
            _object.__proto__ = _class.prototype;
            _object.__proto__.constructor = _class;
            var args = Array.prototype.slice.call(arguments);
            args = args.slice(1, args.length);
            _class.apply(_object, args);
            return _object;
        },
        clone: function (object) {
            function F() {}
            F.prototype = object;
            return new F();
        },
        storeActivtyConfig: function (config) {

            try {
                if (!appInf["activity"][config.name]) throw config.name + " is not find";
                appInf["activity"][config.name].config = config;
            } catch (err) {
                appInf["activity"][config.name] = {};
                appInf["activity"][config.name].config = config;
                // console.log(err);
            }
        },
        getActivityInf: function (name) {
            return appInf.activity[name];
        },
        getRunActivityInf: function (name) {
            return appRunStack[name];
        },
        loadActivityArray: function (loadName) {
            var loadName = loadName;
            var pArr = [];
            for (var k in appInf[loadName]) {
                pArr.push(loadActivity(k));
            }
            return Promise.all(pArr);
        },
        getActivity: function (name) {
            try {
                if (!appRunStack[name]) throw new Error("The Activity named " + name + " is not runstack");
                return appRunStack[name].point;
            } catch (e) {
                console.log(e);
                return false;
            }

        },
        /**
         * 将模块加载到内存中
         * @param transferActivity  父亲
         * @param modname   模版的activity 名称
         * @param runname  运行的activity名称
         * @param targetLoadDom  需要加载到那个dom里面
         * @param type   加载activty类型
         * @returns {Jtype|*}
         */
        loadJActivity: function (transferActivity, modname, runname, targetLoadDom, type) {
            var targetLoadDom = targetLoadDom || document.querySelector('viewport');

            if (J(targetLoadDom).getcss("position") == "static") {
                J(targetLoadDom).setcss("position", "relative");
            }
            if (!appInf.activity[modname]) {
                console.error(modname + " is not exist");
                return;
            }

            var Jtype = appInf.activity[modname].config.type || "JActivity";
            var activity = {};
            appRunStack[runname] = activity;
            activity.name = runname;
            activity.transfer = transferActivity || "root";
            activity.layout = this.clone(appInf.activity[modname].layout);
            Jtype = eval(Jtype);
            activity.Jtype = Jtype;
            activity.config = this.clone(appInf.activity[modname].config);
            activity.config.name = runname;
            activity.loadTarget = targetLoadDom;
            // activity.point = this.create(Jtype, activity);
            activity.point = new Jtype(activity);
            activity.state = 'unload';
            activity.point.transfer = activity.transfer; //指明当前的调用者
            return activity.point;
        },
        /**
         * @param modname 要加载活动的名称
         * @param runname 加载活动对象的名称
         * @param type 加载活动的类型 可以为空 默认为JActivity
         * @returns {*|JActivity}
         */
        loadGlobalJActivity: function (modname, runname, type) {
            if (arguments.length == 1) {
                var key = parseInt(Math.random() * 100000000);
                return this.loadJActivity(null, modname, modname+key, null, null);
            }
            return this.loadJActivity(null, modname, runname, null, type);
        },
        /**
         * [删除一个已经加载的activity的资源]
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        deleteJActivity: function (name) {
            var activity = appRunStack[name];
            activity.loadTarget.removeChild(activity.layout.point);
            delete appRunStack[name];
        },

        /**
         * 定义一个activity或者是model
         * @param config
         */
        define: function (config) {
            if (config.name) {
                if (!window[config.type]) window[config.type] = null;
                this.storeActivtyConfig(config);
                app.resMgr.curLoadActivity = config.name;
            }
        },
        /**
         * 初始化一个资源项目
         * @param name
         * @param url
         * @param fn
         * @returns {{then: then}}
         */
        initLoad: function (name, url, fn) {

        },
        // loadManifest: function (data) {

        // },

        /**
         * 加载一个新的资源项目
         * @param name
         * @param url
         * @param fn
         * @returns {{then: then}}
         */
        loadManifest: function (name, url) {

            function loadManifest(data) {
                if (data.name)
                    document.getElementsByTagName('title')[0].innerHTML = data.name || "未命名";

                if (data.icon) {
                    var iconlink = document.createElement('link');
                    iconlink.href = data.icon.url;
                    iconlink.type = "image/x-icon";
                    iconlink.rel = "icon";
                    head.appendChild(iconlink);
                }
                // appInf = data;
                var activityArray = data["activity"];
                var cssArr = data["CSS"] || data["css"];
                var scriptArr = data["script"];
                var layout = data["layout"] || data["res"]; //  当前的资源文件
                
                if(data.version)
                app.version = data.version

                appInf[loadName] = [];
                // 遍历处理Activity的数据
                for (var k in activityArray) {
                    var layout_url = activityArray[k].layout;
                    var temp = activityArray[k];
                    temp.layout = [];
                    temp.layout.url = layout_url;
                    appInf.activity[activityArray[k].name] = temp;
                    appInf[loadName][activityArray[k].name] = temp;
                }
                pArr.push(APP.loadLayoutArr(layout));
                if (scriptArr) {
                    return loadScriptArr(scriptArr).then(function () {
                        pArr.push(preImgCacheArr(data.preImage));
                        pArr.push(APP.loadActivityArray(loadName));
                        !cssArr || pArr.push(loadCSSArr(cssArr));
                        pArr.push(loadAsyncArr(data.asyncTask));
                        return Promise.all(pArr);
                    });
                } else {
                    pArr.push(preImgCacheArr(data.preImage));
                    pArr.push(APP.loadActivityArray(loadName));
                    !cssArr || pArr.push(loadCSSArr(cssArr));
                    pArr.push(loadAsyncArr(data.asyncTask));
                    return Promise.all(pArr);
                }


                function loadAsyncArr(asyncTask) {

                    if (!asyncTask || asyncTask.length < 1) return Promise.resolve();

                    var arr = [];

                    asyncTask.forEach(function (one) {
                        arr.push(loadAsync(one));
                    });

                    return Promise.all(arr);
                }

                function loadAsync(url) {

                    return loadScript(url).then(function () {
                        return app.async();
                    });

                }

            }

            var loadName = name || new Date().getTime();
            var pArr = [];


            if (typeof name === "object" && name !== null) {
                loadName = Math.random()*10000000000000000;
                return loadManifest(name);
            }

            return loadText(url+"?v="+new Date().getTime()).then(function (json) {
                var data = eval("(" + json + ")");
                return loadManifest(data);
            });
        },
        preCache: function (url) {
            var pArr = [];
            return loadText(url).then(function (json) {
                var data = eval("(" + json + ")");
                var imgArr = data.img;
                pArr.push(APP.preImgCacheArr(imgArr));
                return Promise.all(pArr);
            })
        },
        loadLayoutArr: function (urlArr) {
            if (!urlArr || urlArr.length < 1) {
                return Promise.resolve();
            }
            var pArr = [];
            for (var i = 0; i < urlArr.length; i++) {
                pArr.push(loadLayout(urlArr[i]));
            }
            return Promise.all(pArr);
        },
        // 获取布局文件
        getAppLayout: function () {
            return appInf.layout;
        },
        res:function(text){
            var arr = app.resMgr.loadResForText(text);
            return app.resMgr.dealResArrForNodename(arr);
        },
        getRes: function (res) {
            if (ResMgr.res[res]) {
                return ResMgr.res[res];
            }
            var pathArr = res.split("/");
            try {
                var point = appInf.Res;
                while (path = pathArr.shift()) {
                    point = point[path]
                }
                if (!point) throw new error();
                return point;

            } catch (error) {
                console.log(res + " 资源不存在");
                return false;
            }
        },
        css: function (text) {
            var style = document.createElement("style");
            style.innerHTML = text;
            head.appendChild(style);
        },
        //定义一个view的组件
        view: function (ob) {
            ob.templateFn = templateFn(ob.layout);
            if (ob.el) {
                appInf["view_config"][ob.el] = ob; //当前存储的view的配置
            }
            if (ob.name) {
                app[ob.name] = ob;
            }

            try {
                if (typeof ob.init === "function") { //是函数    其中 FunName 为函数名称
                    ob.init();
                }
            } catch (e) {}

        },
        //调用一个组件
        mountView: function (el, data, _this,key) {
            if(Object.getPrototypeOf(el) === JView){
                var template = templateFn(el.layout());
                var ViewClass = el;
            }else{
                var template = getViewModel(el).templateFn;
                var ViewClass = JView;
            }
            var viewid = parseInt(Math.random() * 100000000)+""+new Date().getTime();
            var a ;
            if(arguments.length==4) {
                _this[key] = new ViewClass(viewid,template,data);
                a = _this[key].initView();
            } else{
                a = template(data);
            }

            var str = `<jview id="${viewid}">${a}</jview>`;

            return str;

            function getViewModel(el) {
                if (!appInf["view_config"][el]) {
                    var ob = {
                        el: el,
                        layout: app.getRes(el).text
                    }
                    ob.templateFn = templateFn(ob.layout);
                    appInf["view_config"][ob.el] = ob;

                }
                return appInf["view_config"][el]
            }
        },
        //获取一个svg资源
        getSvg: function (path) {
            var svgRes = app.getRes(path);
            if (svgRes) {
                var blob = new Blob([svgRes.text], {
                    type: "image/svg+xml"
                });
                var blobUrl = window.URL.createObjectURL(blob);
                return blobUrl;
            }
        },
        loadcss: function (path) {
            var cssRes = app.getRes(path);
            if (cssRes) {

                var text = templateFn(cssRes.text)();

                var style = document.createElement("style");
                style.innerHTML = text;
                head.appendChild(style);
            }
        },
        model: function (ob) {
            app[ob.name] = ob;
            try {
                if (typeof ob.init === "function") { //是函数    其中 FunName 为函数名称
                    ob.init();
                }
            } catch (e) {}
        },
        //动态加载一个类
        dynamicLoadActivity:function(url){

            if(appInf.dynamicLoadActivityMap[url]){
                return Promise.resolve(appInf.dynamicLoadActivityMap[url]);
            }

            return loadLayout(url).then(function(){
                appInf.dynamicLoadActivityMap[url] = app.resMgr.curLoadActivity;
                return Promise.resolve(app.resMgr.curLoadActivity);
            });

        }
    };
})());