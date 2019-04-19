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
        this.initComponents();
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
            console.error(err);
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
    initComponents(){
       for(let id in this.components){
           let component = this.components[id];
           if(typeof component.onMounted === "function" )
           component.mountInit();
       }
    }
}

export default JActivity;