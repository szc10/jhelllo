
// // 用户是否可以允许联网
// console.log(Net.isOnLine());
// Net.addHandler("online",function(){
//     console.log("用户上线");
// });

// Net.addHandler("offline",function(){
//     console.log("用户下线");
// })

(function (global) {
    "use strict";
    var Net = {};
    Net.version = "0.0.1";
    Net.isOnLine = function () {
        if (navigator.onLine) {
            return true;
        } else {
            return false;
        }
    }

    Net.addHandler = function (type, handler) {
        EventUtil.addHandler(window, type, handler);
    }
    global.Net = Net;
    var EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        }
    };

    // EventUtil.addHandler(window, "online", function () {

    // });
    // EventUtil.addHandler(window, "offline", function () {

    // });
}(window))

