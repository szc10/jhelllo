/**
 * Created by szc on 2018/11/2.
 */
(function (global) {
'use strict';
var Http = {};
global.Http = Http;
Http.version = '0.0.3';
Http.get = function (data) {
    var url = data.root + data.path
    var sucFn = data.sucFn || new Function();
    var errFn = data.errFn || new Function();
    var headOparetion = data.headOparetion || {};
    new GetReq(url, data.data, sucFn, errFn, data.withCredentials,headOparetion);
};
Http.post = function (data) {
    var url = data.root + data.path;
    var sucFn = data.sucFn || new Function();
    var errFn = data.errFn || new Function();
    var headOparetion = data.headOparetion || {};
    new PostReq(url, data.data, sucFn, errFn, data.withCredentials,headOparetion);
};
Http.json = function (data) {
    var url = data.root + data.path;
    var sucFn = data.sucFn || new Function();
    var errFn = data.errFn || new Function();
    var headOparetion = data.headOparetion || {};
    new JsonReq(url, data.data, sucFn, errFn, data.withCredentials,headOparetion);
};

Http.form = function (data) {
    var url = data.root + data.path;
    var sucFn = data.sucFn || new Function();
    var errFn = data.errFn || new Function();
    var headOparetion = data.headOparetion || {};
    new FormReq(url, data.data, sucFn, errFn, data.withCredentials,headOparetion);
};
/**
 * 创建一个get的数据请求
 * @param {*} url
 * @param {*} data
 * @param {*} sucFn
 * @param {*} errFn
 */
function GetReq (url, data, sucFn, errFn, withCredentials,headOparetion) {
    var xhr = createXhr();
    url += '?';
    var datastr = (function (obj) { // 转成get请求所需要的字符串.
        var str = '';
        for (var name in obj) {
            str += name + '=' + obj[name] + '&'
        }
        str = str.slice(0, str.length - 1);
        return str;
    })(data);
    url += datastr;
    xhr.withCredentials = withCredentials || false;
    new OnreadyStateChange(xhr, sucFn, errFn);
    xhr.open('get', encodeURI(url), true);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // 为get方式设置请求头
    for(let key in headOparetion){
        xhr.setRequestHeader(key,headOparetion[key])
    }
    xhr.send();
}
/**
 * 创建一个post请求
 * @param {*} url
 * @param {*} data
 * @param {*} sucFn
 * @param {*} errFn
 */
function JsonReq (url, data, sucFn, errFn, withCredentials,headOparetion) {
    let xhr = createXhr();
    let datastr = JSON.stringify(data);
    xhr.withCredentials = withCredentials || false;
    xhr.open('post', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json');
    for(let key in headOparetion){
        xhr.setRequestHeader(key,headOparetion[key])
    }
    new OnreadyStateChange(xhr, sucFn, errFn);
    xhr.send(datastr)
}
/**
 * 发送post请求
 * @param url
 * @param data
 * @param sucFn
 * @param errFn
 * @param withCredentials
 * @param headOparetion
 * @constructor
 */
function PostReq (url, data, sucFn, errFn, withCredentials,headOparetion) {
    var xhr = createXhr();
    var datastr = '';
    for (var i in data) {
        datastr += i + '=' + data[i] + '&';
    }
    datastr = datastr.slice(0, datastr.length - 1);
    xhr.withCredentials = withCredentials || false;
    xhr.open('post', url, true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    for(let key in headOparetion){
        xhr.setRequestHeader(key,headOparetion[key])
    }
    new OnreadyStateChange(xhr, sucFn, errFn);
    xhr.send(datastr)
}

/**
 * 发送表单请求
 * @param url
 * @param data
 * @param sucFn
 * @param errFn
 * @param withCredentials
 * @param headOparetion
 * @constructor
 */
function FormReq (url, data, sucFn, errFn, withCredentials,headOparetion) {
    var xhr = createXhr();
    var form = new FormData();
    for (var i in data) {
        form.append(i, data[i]);
    }
    xhr.withCredentials = withCredentials || false;
    xhr.open('post', url, true)
    for(let key in headOparetion){
        xhr.setRequestHeader(key,headOparetion[key])
    }
    new OnreadyStateChange(xhr, sucFn, errFn);
    xhr.send(form)
}
/**
 * 监听当前的xml的变化
 * @param {*} xhr
 * @param {*} sucFn
 * @param {*} errFn
 */
function OnreadyStateChange (xhr, sucFn, errFn) {
    var t = setTimeout(function () {
        execFn(errFn);
    }, 15000);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 400) {
                var result = xhr.responseText;
                clearTimeout(t);
                execFn(sucFn, result);
            } else {
                execFn(errFn);
                console.log('error:readyState:' + xhr.readyState + 'status:' + xhr.status);
            }
        }
    }
}
/**
 * 执行函数
 * @param {*} fn
 * @param {*} data
 */
function execFn (fn, data) {
    var fn = fn || new Function('');
    try {
        fn(data);
    } catch (error) {
    }
}
/**
 * 创建一个网络请求句柄
 */
function createXhr () {
    return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
}

}(window));
