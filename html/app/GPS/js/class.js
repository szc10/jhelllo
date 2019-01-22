
        (function() {
            var _fn = new Function();
            /**
             * 获取系统的定位模式,获取的格式为纬度和经度
             */
            window.getSysLbs = function(latitude, longitude) {
                _fn(latitude, longitude);
                _fn = new Function();
            }


            var sys = {
                isAndroid: function() {
                    var u = navigator.userAgent;
                    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
                },
                isIos: function() {
                    var u = navigator.userAgent;
                    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                },
                isWeixinBrowser: function() {
                    var ua = navigator.userAgent.toLowerCase();
                    return (/micromessenger/.test(ua)) ? true : false;
                },
                isNative: function() {
                    var u = navigator.userAgent;
                    return u.indexOf('JHELLO') > -1;
                }
            };

            /**
             * 设置当前的回调函数,处理定位的数据
             * @param {*} fn 
             */
            function getLbs(fn) {
                _fn = fn || new Function();
                if (sys.isNative()) {
                    if (sys.isIos())
                        window.webkit.messageHandlers.getLbs.postMessage(null);
                    if (sys.isAndroid())
                        LBS.getLbs();
                } else {
                    _fn(-1, -1);
                }

            }
            window.getLbs = getLbs;
        }());