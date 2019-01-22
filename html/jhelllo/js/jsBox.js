window.onload = function () {
    if (/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function () {}, false);
    }
};

var jsBox = {}; //全局的jsBox对象

jsBox.isArray = function (o) {
    return Object.prototype.toString.apply(o) === "[object Array]";
}
jsBox.isFunction = function (o) {
    return Object.prototype.toString.apply(o) === "[object Function]";
}

/**
 * [获取URL中的get字段]
 * @param  {[type]} ) {var url[description]
 * @return {[type]}   [description]
 */
var $_GET = J_GET = (function () {
    var url = window.document.location.href.toString();
    var u = url.split("?");
    if (typeof (u[1]) == "string") {
        u = u[1].split("&");
        var get = {};
        for (var i in u) {
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
})();

/**
 * [findChild 发现dom其中的子元素]
 * @param  {[type]} dom [dom元素的指针]
 * @return {[type]}     [其中子元素的指针数组]
 */
var findChild = function (dom) {
    // var dom=document.getElementById(ele);
    del_space(dom);
    //return this.thisp.childNodes;
    var kids = new Array();
    for (var i = 0; i < dom.childNodes.length; i++) {
        kids[i] = dom.childNodes[i];
    }
    return kids;
}

/**
 * 类继承函数
 * @param subClass
 * @param superClass
 */
function extend(subClass, superClass) {
    var F = function () {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype; //设置可以直接调用超类中的共有方法
    //确保超类中的constructor被正确设置
    if (superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}

/**
 * [判断dom元素是否含有相应的class类]
 * @param  {[type]} ele [dom元素的指针]
 * @param  {[type]} cls [class 类名称]
 * @return {[type]}     [description]
 */
function hasclass(ele, cls) { //判断元素是否有这个css类
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**为对象增加相应的事件
 * @param ele  dom的指针
 * @param ev    dom的事件
 * @param fn    函数的名字
 */
function AddEvent(ele, ev, fn) {
    try {
        if (!ele)
            throw "element is null";
        else {
            if (ele.attachEvent != null) {
                ele.attachEvent('on' + ev, fn);
            } else {
                ele.addEventListener(ev, fn, false);
            }
        }
    } catch (err) {
        alert(err);
    }
}


/**为对象移除相应的事件
 * 不支持IE8以及更早的浏览器
 * @param ele  dom的指针
 * @param ev    dom的事件
 * @param fn    函数的名字
 */
function removeEvent(ele, ev, fn) {
    try {
        if (!ele)
            throw "element is null";
        else {
            ele.removeEventListener(ev, fn);
        }
    } catch (err) {
        alert(err);
    }
}

function stopBubble(ev) {
    //如果提供了事件对象，则这是一个非IE浏览器
    if (ev && ev.stopPropagation)
        //因此它支持W3C的stopPropagation()方法
        ev.stopPropagation();
    else
        //否则，我们需要使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
}


/**
 * 剔除dom的子元素中的回车
 * @param ele  dom的指针
 */
function del_space(ele) {
    var ele_child = ele.childNodes; //得到参数元素的所有子元素
    for (var i = 0; i < ele_child.length; i++) { //遍历子元素
        if (ele_child[i].nodeName == '#text' && !/\s/.test(ele_child.nodeValue)) {
            ele.removeChild(ele_child[i]);
        }
    }
}

/**
 * 放置某元素 至另外一个元素之外
 * @param position_dom
 * @param need_move_dom
 */
function positeDom(position_dom, need_move_dom) {
    function getSreen() {
        var height = 0;
        var width = 0;
        if (window.innerHeight) {
            height = window.innerHeight;
            width = window.innerWidth;
        } else if (document.body.clientHeight) {
            height = document.body.clientHeight;
            width = document.body.clientWidth;
        }
        return {
            width: width,
            height: height
        }
    }

    var date_input = position_dom;
    var left = date_input.getBoundingClientRect().left;
    var top = date_input.getBoundingClientRect().top;
    var width = date_input.offsetWidth;
    var height = date_input.offsetHeight;
    var innerHeight = getSreen().height;
    var innerWidth = getSreen().width;
    need_move_dom.style.display = "block";
    if (innerWidth - left < need_move_dom.offsetWidth) {
        need_move_dom.style.left = (left - need_move_dom.offsetWidth / 2) + "px";
    } else {
        need_move_dom.style.left = left + "px";
    }
    if ((innerHeight - top - height) < need_move_dom.offsetHeight) {
        need_move_dom.style.top = (top - need_move_dom.offsetHeight - height) + "px";
    } else {
        need_move_dom.style.top = (top + height) + "px";
    }
}


var CSS = (function () {
    var styleElement;

    function insertCSSRule(rule) { //当插入样式规则
        if (styleElement) { //如果之前已经插入过了，那么就进入if
            var number = 0;
            try {
                var sheet = styleElement.sheet; //样式表对象
                var cssRules = sheet.cssRules; //样式规则对象
                number = cssRules.length; //有多少样式规则
                sheet.insertRule(rule, number); //把rule插入到样式表对象中，位置在number处。
            } catch (e) {
                console.log(e.message + rule); //抛出错误
            }
        } else { //如果是第一次插入
            styleElement = document.createElement("style"); //创建一个新的style
            styleElement.innerHTML = rule; //把样式规则放入这个style标签中
            document.head.appendChild(styleElement); //把这个style插入到页面中
        }
    }

    var fn = {
        insertRule: function (rule) {
            insertCSSRule(rule);
            return fn;
        },

        deleteRule: function (ruleName) {
            var sheet = styleElement.sheet;
            var cssRules = sheet.cssRules;
            for (var i = 0, n = cssRules.length; i < n; i++) {
                var rule = cssRules[i];
                if (rule.selectorText == ruleName) {
                    sheet.deleteRule(i);
                    break;
                }
            }
            return fn;
        }
    };
    return fn;
}());


CSS.insertRule('._hide{ display:none} !important;')


/*dom元素处理模块*/
var J = function (ele) {
    if (ele.constructor == String) {
        if (!(this instanceof J)) {
            return new J(ele);
        }
        try {
            if (!document.getElementById(ele)) throw ele + " is not find";
            this.thisp = document.getElementById(ele);
            //J_object[ele] = this;
            //return this;
        } catch (err) {
            console.log(err);
        }
    } else if (ele.nodeType == Node.ELEMENT_NODE) {
        //alert("this is node");
        if (!(this instanceof J)) {
            return new J(ele);
        }
        this.thisp = ele;
        //return this;
    }

    this.style = this.thisp.style;
    this.src = this.thisp.src;
    this.getcss = function (key) {
        var cssArray = window.getComputedStyle ? window.getComputedStyle(this.thisp, "") : this.thisp.currentStyle;
        return cssArray[key];
    }

    this.setcss = function (style, value) {
        this.style[style] = value;
        return this;
    }
    return this;
}
J.prototype = {
    /**
     * [touchstart description]
     * @param  {[type]} fun [description]
     * @return {[type]}     [description]
     */
    touchstart: function (fun) {
        AddEvent(this.thisp, 'touchstart', fun);
        return this;
    },
    touchend: function (fun) {
        AddEvent(this.thisp, 'touchend', fun);
        return this;
    },
    click: function (fun) {
        AddEvent(this.thisp, 'click', fun);
        return this;
    },
    dblclick: function (fun) {
        AddEvent(this.thisp, 'dblclick', fun);
        return this;
    },
    blur: function (fun) {
        AddEvent(this.thisp, 'blur', fun);
        return this;
    },
    change: function (fun) {
        AddEvent(this.thisp, 'change', fun);
        return this;
    },
    focus: function (fun) {
        AddEvent(this.thisp, 'focus', fun);
        return this;
    },
    mousemove: function (fun) {
        AddEvent(this.thisp, 'mousemove', fun);
        return this;
    },
    mouseout: function (fun) {
        AddEvent(this.thisp, 'mouseout', fun);
        return this;
    },
    positeDom: function (position_dom) {
        positeDom(position_dom, this.thisp);
    },
    hide: function () {
        this.addClass('_hide');
    }
}




J.prototype.getType = function (type) {
    return this.thisp[type];
}

J.prototype.setType = function (type, value) {
    this.thisp[type] = value;
    return this;
}

J.prototype.append = function (part) {
    this.thisp.innerHTML += part;
    return this;
}
J.prototype.setValue = function (value) {
    this.thisp.value = value;
    return this;
}

J.prototype.getValue = function () {
    return this.thisp.value;
}

J.prototype.getHtml = function () {
    return this.thisp.innerHTML;
}

/**
 * 向dom设置为新的innerHtml  若没有参数,设置为空
 * @param html html代码
 */
J.prototype.setHtml = function (html) {
    var temp = '' || html
    this.thisp.innerHTML = temp;
    return this;
}
/**
 * 向dom增加一个class
 * @param cla class
 */
J.prototype.addClass = function (cla) {
    if (!hasclass(this.thisp, cla)) this.thisp.className += " " + cla; //取消一个外部的css类
    return this;
}

/**
 * 向dom消除一个class
 * @param cla class
 */
J.prototype.removeClass = function (cla) {
    if (hasclass(this.thisp, cla)) {
        var reg = new RegExp('(\\s|^)' + cla + '(\\s|$)');
        this.thisp.className = this.thisp.className.replace(reg, ' ');
    }
    return this;
}

/**
 * 向dom动态增加或消除一个class
 * @param cla class
 */
J.prototype.toggleClass = function (cla) {
    if (hasclass(this.thisp, cla)) {
        this.removeClass(cla);
    } else
        this.addClass(cla);
    return this;
}

/**
 * 发现父元素中的子元素
 * @param ele  dom的指针
 */

J.prototype.findChild = function () {
    del_space(this.thisp);
    //return this.thisp.childNodes;
    var kids = new Array();
    for (var i = 0; i < this.thisp.childNodes.length; i++) {
        kids[i] = J(this.thisp.childNodes[i]);
    }
    return kids;
}
J.prototype.domAll = function (selector) {
    return this.thisp.querySelectorAll(selector);
}

J.prototype.domFirst = function (selector) {
    return this.thisp.querySelector(selector);
}


/*!
 * Jajax JavaScript Library v0.1.0
 * https://github.com/szc10/Jajax
 *
 * author: 施哲晨
 * inf:一个轻量化的ajax组件
 * Date: 2016-03-22
 *
 * @param config
 *
 *  config.url: string,  请求的地址,不可省
 *  config.data: object,     请求的对象,可省
 *  config.type: "post||get", 请求的方式,可省,默认post
 *  config.json_back: boolean, 请求回的数据json序列化,可省,默认false
 *  config.file: object,要发送的文件,可省,如果请求方式为get,则自动忽略
 *  config.complete: function, 请求成功后的处理函数,不可省
 *  config.callback: function, 请求完成后的处理函数,可省
 *  config.error: function,   请求失败后的处理函数,可省
 *
 */

var Jajax = function (config) {

    var file = config.file; //获取文件
    var url = config.url; //获取url地址
    var data = config.data; //获取data数据
    var complete = config.complete; //接受200后的请求处理
    var callback = config.callback; //任务完成后的回调函数
    var json_back = config.json_back; //返回值是否json数组遍历化
    var error = config.error; //任务失败的的回调函数
    var type = config.type || "post";
    var form = null;
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    if (type == 'GET' || type == 'get') {
        url += "?";
        data = (function (obj) { // 转成get请求所需要的字符串.
            var str = "";
            for (var name in obj) {
                str += name + "=" + obj[name] + "&"
            }
            return str;
        })(data);
        url += data;
        xhr.open('get', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //为get方式设置请求头
    } else {
        form = new FormData(); //建立一个表单对象
        for (var filename in file)
            form.append(filename, file[filename]); //将文件放入表单中
        for (var name in data)
            form.append(name, data[name]); //将data数据放入表单中
    }

    xhr.onreadystatechange = _onreadystatechange;

    if (type == 'get' || type == 'GET') { //开始发送get请求
        xhr.send();
    } else {
        xhr.open('post', url, true); //开始发送post请求
        xhr.send(form);
    }
    /**
     * 准备接受服务端发送过来的请求包
     * @private
     */
    function _onreadystatechange() {
        if (xhr.readyState == 4)
            if (xhr.status == 200) {
                if (json_back == true) {
                    var result = xhr.responseText;
                    if (result)
                        var re = eval("(" + result + ")");
                    else
                        var re = "";
                    complete(re);
                } else {
                    complete(xhr.responseText);
                }
                if (jsBox.isFunction(callback)) {
                    callback();
                }
            } else {
                if (jsBox.isFunction(error)) {
                    error();
                }
                console.log("error:readyState:" + xhr.readyState + "status:" + xhr.status);
            }
    }
}


var Cookie = {
    /**
     * [设置相应cookic值]
     * @param {[type]} key        [cookic的键值]
     * @param {[type]} value      [cookic的值]
     * @param {[type]} expiredays [过期时间,按天算]
     */
    set: function (key, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays)
        var the_cookie = key + "=" + value + ";"; //编写cookie的键与值
        the_cookie += ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
        the_cookie = the_cookie + "path=/;"; //设置cookie的路径
        the_cookie = the_cookie + "domain=" + document.domain + ";"; //设置cookie的域
        document.cookie = the_cookie; //将这些信息写入cookie变量中去
    },
    /**
     * [通过相应的键值,获取cookic值]
     * @param  {[type]} key [description]
     * @return {[type]}     [description]
     */
    get: function (key) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(key + "=")
            if (c_start != -1) {
                c_start = c_start + key.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return false;
    }
}

/**
 * 创建模板类
 * @param tmpl  输入模板源 (可以dom节点的名称,可以是节点,也可以是字符串)
 */
var Jtmpl = function (tmpl) {
    if (document.getElementById(tmpl)) {
        var html = document.getElementById(tmpl).innerHTML; //获取基本的模板代码
    } else if (tmpl.nodeType == Node.ELEMENT_NODE) {
        var html = tmpl.innerHTML;
    } else {
        var html = tmpl;
    }
    // console.log(html);
    var p = []; //设置合成代码数组
    var dealHtml = html.replace(/{{=(.*?)}}/g, "');p.push($1);p.push('"); //将<%=xxx%> 替换为 ');p.push(xxx);p.push('
    dealHtml = dealHtml.replace(/{{/g, "');"); //将<% 替换为');
    dealHtml = dealHtml.replace(/}}/g, "p.push('"); //将%> 替换为p.push('
    //用p.push('')组织代码包裹起来
    dealHtml = "var p=[];p.push('" + dealHtml + "'); return p.join(''); ";
    dealHtml = dealHtml.replace(/[\r\t\n]/g, "");
    dealHtml = dealHtml.replace(/&lt;/g, "<");

    // console.log(dealHtml);
    try {
        var fn = new Function('data', dealHtml);
    } catch (e) {
        console.log(e);
    }

    /**
     * 生成带有数据的html代码
     * @param data
     * @returns {*}
     */
    this.createHtml = function (data) {
        var html;
        html = fn(data);
        return html;
    };
    /**
     * 获取一个方法模板体
     * @returns {*}
     */
    this.getFunction = function () {
        return new Function('data', 'method', dealHtml);;
    }
}



/**
 * 时间监听处理
 * @type {{click, change}}
 */
Action = (function () {

    /**
     * [tapInf 设置触摸事件对象]
     * @type {Object}
     */
    var tapInf = {
        target: null,
        signal: null
    }


    var domAction = [];
    domAction['click'] = [];
    domAction['change'] = [];
    domAction['bgclick'] = [];
    var listener = document;

    AddEvent(document, 'click', function (e) {
        for (var i in domAction.bgclick) {
            domAction.bgclick[i].call();
            delete domAction.bgclick[i];
        }

    });


    for (var eventType in domAction) {


        var listener = document.getElementsByTagName('viewport')[0] || document;

        listener.addEventListener(eventType, function (ev) {

            var target = ev.target;
            var id = target.id;
            var type = ev.type;
            var actionArr = getDomActionArr(target);
            dealAction.call(ev.target, type, id);


            for (var i = 0; i < actionArr.length; i++) {
                dealAction.call(target, type, actionArr[i]);
            }

            function dealAction(type, action) {
                if (domAction[type][action]) {
                    domAction[type][action].call(this);
                } else {
                    return;
                }
            }

            function getDomActionArr() {
                if (target.dataset.action) {
                    return target.dataset.action.split(" ");
                } else if (target.parentNode.dataset) {
                    target = target.parentNode;
                    if (target.dataset.action)
                        return target.dataset.action.split(" ");
                    else return [];
                } else {
                    return [];
                }
            }
        });
    }

    domAction['tap'] = [];
    document.addEventListener("touchstart", function (ev) {
        tapInf.target = ev.target;
        tapInf.signal = 1;
    }, false);
    document.addEventListener("touchmove", function () {
        tapInf.signal = null;
    }, false);

    document.addEventListener("touchend", function () {
        if (tapInf.signal == 1) {
            var type = "tap";
            var target = tapInf.target;
            var id = target.id;
            var action = target.dataset.action;
            if (domAction[type][id]) {
                domAction[type][id].call(target);
            } else if (domAction[type][action]) {
                domAction[type][action].call(target);
            }
        }
        tapInf.signal = null;
    }, false);

    return {
        click: function (action, fn) {
            domAction['click'][action] = fn;
        },
        change: function (action, fn) {
            domAction.change[action] = fn;
        },
        tap: function (action, fn) {
            domAction.tap[action] = fn;
        },
        getDomAction: function () {
            return domAction;
        },
        setBgClickAction: function (fn) {
            domAction.bgclick.push(fn);
        }
    }
}());



var URLrouter = (function () {
    /**
     * 初始化相关列表栏
     * @type {string}
     */
    var url = window.document.location.href.toString();
    var u = url.split("#");
    var hash = [];
    if (typeof (u[1]) == "string") {
        u = u[1].split("&");
        for (var i in u) {
            if (u[i]) {
                var j = u[i].split("=");
                hash[j[0]] = j[1];
            }
        }
    }
    /**
     * 更新Url地址
     */
    function reflashURL() {
        var hashURL = "";
        for (var key in hash) {
            hashURL += key + "=" + hash[key] + "&";
        }
        hashURL = hashURL.substr(0, hashURL.length - 1);
        window.location.hash = hashURL;
    }
    return {
        /**
         * 更新url的锚链接
         * @param hashArray
         */
        updateHash: function (hashArray) {
            for (var key in hashArray) {
                hash[key] = hashArray[key];
            }
            reflashURL();
        },
        /**
         * [删除锚链接其中的一个值]
         * @param  {[type]} hashKey [description]
         * @return {[type]}         [description]
         */
        deleteHash: function (hashKey) {
            delete hash[hashKey];
            reflashURL();
        },
        getHash: function (key) {
            return hash[key];
        },
        /**
         * 页面跳转
         * @param url 跳转地址
         */
        jumpUrl: function (url) {
            window.location.href = url;
        }

    }
}());


/**
 * [Transition 动画引擎模块]
 * @param {[type]} dom [description]
 */
function Transition(dom) {
    var callFn = new Function("");
    var noFn = new Function("");
    dom.style.transition = "all .3s";
    dom.style["will-change"] = "all";
    dom.style["transition-timing-function"] = "";
    dom.style.transform = "translate3d(0, 0, 0)";
    dom.style["backface-visibility"] = "hidden";
    dom.style["perspective"] = 1000;
    dom.style.opacity = J(dom).getcss('opacity');
    /**
     * 设置动画完成后监听
     * @returns {*}
     */
    dom.addEventListener('transitionend', function (ev) {
        callFn.call(dom);
        callFn = noFn;
    }, false);

    function getTransform() {
        return dom.style.transform;
    }


    return {
        setDuration: function (time) {
            dom.style["transition-duration"] = time + "s";
            return this;
        },
        setOpacity: function (num) {
            dom.style.opacity = num;
            return this;
        },
        set3dCoordinate: function (con) {
            var x = con.x || 0;
            var y = con.y || 0;
            var z = con.z || 0;
            dom.style.transform = "translate3d(" + x + "," + y + "," + z + ")";
            return this;
        },
        getDisplay: function () {
            J(dom).setcss('display', 'block');
            J(dom).getcss("display");
            return this;
        },
        setTimefunction: function (con) {
            if (con instanceof Object) {
                var x1 = con.x1 || 0;
                var x2 = con.x2 || 0;
                var y1 = con.y1 || 0;
                var y2 = con.y2 || 0;
                var timeStr = "cubic-bezier(" + x1 + ", " + y1 + ", " + x2 + ", " + y2 + ")";
                dom.style["transition-timing-function"] = timeStr;
            } else {
                dom.style["transition-timing-function"] = con;
            }
            return this;
        },
        then: function (fn) {
            callFn = fn;
            return this;
        }
    }
}

ArrayDao = {
    indexOf: function (array, val) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == val) return i;
        }
        return -1;
    },
    remove: function (array, val) {
        var index = ArrayDao.indexOf(array,val);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

};