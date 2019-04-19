class JView {
    constructor(view_id,templateFn,data) {
        this.view_id = view_id;
        this.templateFn = templateFn;
        this.actionArr = [];
        this.components = {};
        // 判断当前的数据类型
        if(data){
            this.data = data;
        } else{            
           !(typeof this.__proto__.constructor.data =="function")  || (this.data = this.__proto__.constructor.data());
        }
        return this;
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
    // 初始化挂载函数
    mountInit(){
        this.initComponents();
        // 执行元素挂载时候的回调
       this.onMounted();
    }
    // 卸载
    unmount(){
       this.getContext().parentNode.removeChild(this.getContext());
    }
    /**
     * 挂载到某个dom对象中
     * @param dom
     * @param data 传入的参数
     * @props 挂载后的外部指针
     */
    mountAt(dom,data,props){
        this.props = props || {}; // 是否挂载一个外部道具
        this.data = data;
        this.context = document.createElement("jview");
        this.templateFn = templateFn(this.layout() || "");
        this.context.innerHTML =this.initView();
        dom.append(this.context);
        this.mountInit(); // 执行挂载操作

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
    onMounted(){
          // 需要具体实现相应的方法
    }
    initComponents(){
        for(let id in this.components){
            let component = this.components[id];
            if(typeof component.onMounted === "function" )
                component.mountInit();
        }
    }
}
export default JView;