app.define({
    name: "main",
    data: {
        formula: ""
    },
    init: function () {
        this.span1 = this.findDom("span1");  // 上方的显示数字
        this.span2 = this.findDom("span2");  // 下方的显示数字
        // 设置监听事件
        this.addEvent("click", "numFn", this.numFn);
        this.addEvent("click", "delFn", this.delFn);
        this.addEvent("click", "clearFn", this.clearFn);
        this.addEvent("click", "resultFn", this.resultFn);
        
        new ObserveOb(this.data,(a, b, c) => {
            this.span2.innerHTML = this.data.formula;
        });
    },
    numFn: function (dom) {
        var num = dom.dataset.id;
        this.data.formula += num;
    },
    delFn: function () {
        this.data.formula = this.data.formula.substr(0, this.data.formula.length - 1);
    },
    clearFn: function () {
        this.data.formula = "";
        this.span1.innerHTML = "";
        this.span2.innerHTML = "";
    },
    resultFn: function () {
        var formula = this.data.formula;
        formula = formula.replace(/÷/g, "/").replace(/×/g, "*");
       // 异常结果处理 
        try {
            var result = eval(formula); 
        } catch (error) {
            var result = "结果异常";
        }
       
        this.span1.innerHTML = this.data.formula;
        this.data.formula = result;
    }

});