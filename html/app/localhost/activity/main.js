
app.res(`<layout data-id="context">
<context>
    <!-- 通过模板来加载模块 -->
    {{=app.mountView("header_no_icon","设置启动页")}}

    <div class="context-wrap" name="context" style="position:relative">

    </div>
</context>
</layout>


<script>
APP.define({
    name: "main",
    layout: resMap.context,
    init: function (data) {


    },
    activite: function () {
        var context = this.findDom("context");
        new Lazyloadimg(context);
    },
    sleep: function () {

    },
    methods: {
           
    }
});
</script>`);