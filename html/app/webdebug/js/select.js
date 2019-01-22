/**
 * Created by szc on 2016/12/9.
 */

var SelectCustom = (function() {
    /**
     * 初始化相关的样式
     * @type {null}
     * @private
     */
    CSS.insertRule(" ._no_display{ display: none !important;}");
    CSS.insertRule("div-select {  display: inline-block;  width: 100px;  padding-top: 5px;  padding-bottom: 5px;  border: solid rgb(200,200,200) 1px;  padding-left: 3px;  }");
    CSS.insertRule("div-select-panel::-webkit-scrollbar {  width: 2px;  background-color: #F5F5F5;  }");
    CSS.insertRule("div-select-panel::-webkit-scrollbar-thumb {background-color: #c3c1bf;}");
    CSS.insertRule("div-select-panel {display: inline-block;   background: #FFFFFF;  position: absolute;  overflow-x: hidden;  overflow-y: scroll; border: solid rgb(200,200,200) 1px;border-top-width: 0px; background-color: #fff;z-index:99}");
    CSS.insertRule("div-select-panel li {padding-top: 10px; padding-left: 5px;  padding-bottom: 10px;  border-bottom: solid 1px rgb(240, 240, 240);  width: 100%; }");
    var _select_input = null;
    var _select_editor = null;
    
  var div_select_wrapper = document.createElement('div-select-wrapper');//下拉框容器
    div_select_wrapper.className = "_no_display";
    div_select_wrapper.style.cssText = "position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 99;"
    document.body.appendChild(div_select_wrapper);

    var _select_panel_wrapper = document.createElement('div-select-panel');//下拉框容器
    _select_panel_wrapper.className = "_no_display";
    document.body.appendChild(_select_panel_wrapper);

    var _select_panel = document.createElement('ul');//下拉框列表
    _select_panel_wrapper.appendChild(_select_panel);
    var _select_callFn = new Function('');
    var _select_sty_arr = [];
    _select_sty_arr['defalut'] = function(data) {
        var str = "";
        for (var k = 0; k < data.length; k++) {
            var one = data[k];
            var tmpl = '<li data-val="' + one.value + '">' + one.text + '</li>';
            str += tmpl;
        }
        return str;
    };
    J(_select_panel).click(function(ev) {
        var target = ev.target;
        _select_editor.value = target.innerHTML;//文本框的内容被替换
        _select_editor.dataset.val = target.dataset.val;//文本框的data-val值被替换
        closePanel();
        _select_callFn.call(_select_panel, _select_editor);
    });

    J(div_select_wrapper).click(function(){
        closePanel();
    });

    function closePanel() {
         J(div_select_wrapper).addClass('_no_display');
        J(_select_panel_wrapper).addClass('_no_display');
    }

    function displayPanel(dom) {
        var positeDomH = parseFloat(J(dom).thisp.clientHeight);
        var positeDomW = J(dom).thisp.clientWidth;

        J(_select_panel_wrapper).positeDom(dom);
        J(_select_panel_wrapper).setcss('max-height', positeDomH * 5 + "px");
        J(_select_panel_wrapper).setcss('width', positeDomW + "px");
        J(div_select_wrapper).removeClass('_no_display');
        J(_select_panel_wrapper).removeClass('_no_display');
    }

    var retFn = {
        triggerSelect: function(dom, data) {
            _select_input = dom;
            _select_editor = _select_input.querySelector('input');
            _select_panel.innerHTML = _select_sty_arr.defalut(data);
            displayPanel(_select_input);
            //console.log(J(_select_panel_wrapper).thisp.className);
            return retFn;
        },
        then: function(fn) {
            _select_callFn = fn;
        }
    };
    return retFn;
}());
