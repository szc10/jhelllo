    const OP = Object.prototype;
    const types = {
        obj: '[object Object]',
        array: '[object Array]'
    }
    const OAM = ['push', 'pop', 'shift', 'unshift', 'short', 'reverse', 'splice']
    class ObserveOb {
        constructor(obj, cb) {
            if (OP.toString.call(obj) !== types.obj && OP.toString.call(obj) !== types.array) {
                return false;
            }
            this._callback = cb;
            this.observe(obj);
        }
        observe(obj, path) {
            if (OP.toString.call(obj) === types.array) {
                this.overrideArrayProto(obj, path);
            }
            Object.keys(obj).forEach((key) => {
                let oldVal = obj[key];
                let pathArray = path && path.slice();
                if (pathArray) {
                    pathArray.push(key);
                } else {
                    pathArray = [key];
                }
                Object.defineProperty(obj, key, {
                    get: function () {
                        return oldVal;
                    },
                    set: (function (newVal) {
                        if (oldVal !== newVal) {
                            if (OP.toString.call(newVal) === '[object Object]') {
                                this.observe(newVal, pathArray);
                            }
                            oldVal = newVal
                            this._callback(pathArray, newVal, oldVal)
                        }
                    }).bind(this)
                })
                if (OP.toString.call(obj[key]) === types.obj || OP.toString.call(obj[key]) === types.array) {
                    this.observe(obj[key], pathArray)
                }
            }, this)
        }
        overrideArrayProto(array, path) {
            // 保存原始 Array 原型    
            var originalProto = Array.prototype,
                // 通过 Object.create 方法创建一个对象，该对象的原型是Array.prototype    
                overrideProto = Object.create(Array.prototype),
                self = this,
                result;
            // 遍历要重写的数组方法    
            OAM.forEach((method) => {
                Object.defineProperty(overrideProto, method, {
                    value: function () {
                        var oldVal = this.slice();
                        //调用原始原型上的方法    
                        result = originalProto[method].apply(this, arguments);
                        //继续监听新数组    
                        self.observe(this, path);
                        self._callback(path, this, oldVal);
                        return result;
                    }
                })
            });
            // 最后 让该数组实例的 __proto__ 属性指向 假的原型 overrideProto    
            array.__proto__ = overrideProto;

        }
    }
    /**
     * [ActionSlots 对事物建立一个新的监听槽,可重复对象]
     * @param {[type]} dom        [description]
     * @param {[type]} actionType [description]
     */
    ActionSlots = function (dom, actionType, point) {

        var domAction = [];
        var listener = dom;
        this.listener = listener;
        var eventType = actionType;
        var thisp = this;
        AddEvent(listener, eventType, function (ev) {
            var target = thisp.getDomTarget(ev.target);
            var actionArr = thisp.getDomActionArr(target);

            for (var i = 0; i < actionArr.length; i++) {
                dealAction.call(target, actionArr[i], target, ev);
            }
        });

        function dealAction(action, target, ev) {
            if (domAction[action]) {
                domAction[action].call(point, target, ev);
            } else {
                return;
            }
        }

        this.addEvent = function (action, fn) {
            domAction[action] = fn;
        };
    }

    ActionSlots.prototype.getDomTarget = function (dom) {
        var target = dom;
        if (target.dataset.action || (target.nodeName == "CONTEXT" || target.nodeName == "BODY" || target.nodeName == "UIACTIVITY" || target == this.listener)) {
            return target;
        } else {
            return this.getDomTarget(target.parentNode);
        }
    };

    ActionSlots.prototype.getDomActionArr = function (target) {
        if (target.dataset.action) {
            return target.dataset.action.split(" ");
        } else {
            return [];
        }
    }


    var JTemplate = function (_OB) {
        var target = this.loadTar = _OB.target;
        var method = _OB.method || [];
        var data = _OB.data || [];
        var tmpl = new Jtmpl(_OB.html);
        var point = document.createElement('uitemplate');
        target.appendChild(point);
        for (var k in method) {
            this[k] = method[k];
        }
        this._setData = function (key, _data) {

            // var data = {};
            data[key] = _data;
            // console.log(data);
        };
        this._start = function () {

            var html = tmpl.getFunction().call(this, data, method);
            point.innerHTML = html;
        };
        this._sleep = function () {
            point.style.display = "none";
        };
        this._activite = function () {
            point.style.display = "block";
        };
        this._context = point;
    };

    JTemplate.prototype = {
        start: function (key, data) {
            if (key && data)
                this._setData(key, data);
            this._start();
            this._activite();
            return this;
        },
        setData: function (key, data) {
            if (key && data)
                this._setData(key, data);
            this._start();
            return this;
        },
        activite: function () {
            this._activite();
            return this;
        },
        sleep: function () {
            this._sleep();
            return this;
        },
        getContext: function () {
            return this._context;
        },
        destroy: function () {
            this.loadTar.removeChild(this._context);
        }
    };


    class JView {
        constructor(view_id,templateFn,data) {
            this.view_id = view_id;
            this.templateFn = templateFn;
            this.actionArr = [];
            this.components = {};
            if(data){
                this.data = data;
            } else{            
               !(typeof this.__proto__.constructor.data =="function")  || (this.data = this.__proto__.constructor.data());
            }
        }
      
        findDom(name) {
            try {
                if (!this.getContext().querySelector('*[name="' + name + '"]')) throw "name:" + name + " is not find";
                return this.getContext().querySelector('*[name="' + name + '"]');
            } catch (err) {
                console.log(err);
            }

        }
        findDomById(id) {
            if(this.components[id]){
                return this.components[id];
            }
            try {
                if (!this.getContext().querySelector('*[id="' + id + '"]')) throw "id:" + id + " is not find";
                return this.getContext().querySelector('*[id="' + id + '"]');
            } catch (err) {
                console.log(err);
            }
        }
        /**
         * 获取ui中的布局正文
         * @returns {*}
         */
        getContext() {
            if(!this.context){
                this.context = J(this.view_id).thisp;
            }
            return this.context;
        }
    
        addEvent(actionType, actionName, fn) {
            if (this.actionArr[actionType]) {
                this.actionArr[actionType].addEvent(actionName, fn);
            } else {
                this.actionArr[actionType] = new ActionSlots(this.getContext(), actionType, this);
                this.actionArr[actionType].addEvent(actionName, fn);
            }
        }
        set(data) {
            this.data = data;
            this.getContext().innerHTML = this.templateFn.call(this,data);
        }
        initView(){
            return this.templateFn.call(this,this.data);
        }
        mountView(config) 
        {
            var onn = {};
            var data = config.data;
            var el = config.tag;
            var id = config.id;
            var res = app.mountView(el, data ,onn,"point");
            this.components[id] = onn.point;
            return res;
        }
    }


    class JActivity {
        constructor(config) {
            this.config = config;
            this.data = config.data || {};
            this.action = config.config;
            this.context = null;
            this.actionArr = [];
            //如果模板不存在则创建一个空的队列
            this.action.template = this.action.template || [];
            this.components = {};

            var uiactivity = document.createElement('uiactivity');
            this.config.loadTarget.appendChild(uiactivity);
            this.config.layout.point = uiactivity;
            /**
             * 初始化的时候的系统函数
             * @private
             */
            /**
             * [插件初始化所需要的方法,在类继承的时候所需要用到]
             * @return {[type]} [description]
             */
            this.plugInit = new Function("");
            for (var k in this.action) {
                if (isloadFn(k)) {
                    this[k] = this.action[k];
                }
            }

            function isloadFn(action) {
                var checkFnArr = ["init", "activite", "sleep", "destroy", "name", "type"];
                for (var k in checkFnArr) {
                    if (action == checkFnArr[k])
                        return false;
                }
                return true;
            }
            this._init = function () {

                this._templateFn = templateFn(this.config.layout.data || this.action.layout.text || this.action.layout);

                this.config.layout.point.innerHTML = this._templateFn.call(this, this.data);

                this.context = this.getContext();
                if (this._preInit) {
                    this._preInit();
                }
                if (this.action.init) {
                    this.action.init.apply(this, arguments);
                }
                this.plugInit();
            };
            /**
             * 唤醒的时候的系统函数
             * @private
             */
            this._activite = function () {
                this.config.layout.point.style.display = "block";
                if (this.action.activite) {
                    this.action.activite.apply(this, arguments);
                }
                // var uiactivity = this.config.layout.point;
            };
            /**
             * 睡眠的时候的系统函数
             * @private
             */
            this._sleep = function () {
                if (this.action.sleep) {
                    this.action.sleep.apply(this, arguments);
                }
                this.config.layout.point.style.display = "none";
            };
            /**
             * 销毁的时候的系统函数
             * @private
             */
            this._destroy = function () {
                if (this.action.destroy) {
                    this.action.destroy.apply(this, arguments);
                }
                APP.deleteJActivity(this.action.name);
            };
            /**
             * 更新当前activity的状态
             * @param newState
             * @private
             */
            this._updateState = function (newState) {
                this.config.state = newState;
            };
            /**
             * 获取当前Activity的状态
             * @returns {*}
             */
            this.getState = function () {
                return this.config.state;
            };
        }

        init() {
            var state = "paused";
            this._updateState(state);
            this._init.apply(this, arguments);
            return this;
        }
        activite() {
            var state = "active";
            this._updateState(state);
            this._activite.apply(this, arguments);
            return this;
        }
        sleep() {
            var state = "paused";
            this._updateState(state);
            this._sleep.apply(this, arguments);
        }
        destroy() {
            this._destroy.apply(this, arguments);
        }
        loadTemplate(name, target) {
            var _ob = APP.clone(this.action.template[name]);
            _ob.target = target;
            try {
                if (!this.config.layout.point.querySelector('script[data-name="' + name + '"]')) throw "act-name:" + name + " is not find";
                _ob.html = this.config.layout.point.querySelector('script[data-name="' + name + '"]').innerHTML;
            } catch (err) {
                console.log(err);
            }

            return new JTemplate(_ob);
        }
        // 通过传入string来创建模板
        render(str, target) {
            var _ob = APP.clone(this.action.template[name]);
            _ob.target = target;
            try {
                _ob.html = str;
            } catch (err) {
                console.log(err);
            }

            return new JTemplate(_ob);
        }
        findDom(name) {
            try {
                if (!this.context.querySelector('*[name="' + name + '"]')) throw "name:" + name + " is not find";
                return this.context.querySelector('*[name="' + name + '"]');
            } catch (err) {
                console.log(err);
            }

        }
        findDomById(id) {
            if(this.components[id]){
                return this.components[id];
            }
            try {
                if (!this.context.querySelector('*[id="' + id + '"]')) throw "id:" + id + " is not find";
                return this.context.querySelector('*[id="' + id + '"]');
            } catch (err) {
                console.log(err);
            }
        }
        /**
         * 获取ui中的布局正文
         * @returns {*}
         */
        getContext() {
            var dom = this.config.layout.point;
            for (var i = 0; i < dom.childNodes.length; i++) {
                if (dom.childNodes[i].nodeName == "CONTEXT")
                    return dom.childNodes[i];
            }
            return this.config.layout.point;
        }
        /**
         * 获取ui中的模板文件
         * @param name
         * @returns {*}
         */
        getTemplate() {
            var dom = this.config.layout.point;
            var templateArr = [];
            for (var i = 0; i < dom.childNodes.length; i++) {
                if (dom.childNodes[i].nodeName == "SCRIPT") {
                    templateArr.push(dom.childNodes[i]);
                    if (dom.childNodes[i].dataset.name) {
                        templateArr[dom.childNodes[i].dataset.name] = dom.childNodes[i];
                    }
                }
            }
            return templateArr;
        }
        /**
         * 加载一个activity活动
         * @param modname
         * @param runname
         * @param targetLoadDom
         * @param type
         * @returns {*|JActivity}
         */
        loadActivity(modname, runname, targetLoadDom, type) {
            return APP.loadJActivity(this, modname, runname, targetLoadDom, type);
        }
        addEvent(actionType, actionName, fn) {
            if (this.actionArr[actionType]) {
                this.actionArr[actionType].addEvent(actionName, fn);
            } else {
                this.actionArr[actionType] = new ActionSlots(this.config.layout.point, actionType, this);
                this.actionArr[actionType].addEvent(actionName, fn);
            }
        }
        // 刷新界面
        reflash(data) {
            this.config.layout.point.innerHTML = this._templateFn(data);
        }
        mountView(config) {
            var onn = {};
            var data = config.data;
            var el = config.tag;
            var id = config.id;
            var res = app.mountView(el, data ,onn,"point");
            this.components[id] = onn.point;
            return res;
        }
    }