app.res(`<layout data-id="context">
    <context data-action="close">
        <iframe name="web" style="width:100vw;height:100vh" src="" data-action="close">
        </iframe>
        <style>
            .ooo-close {
                position: fixed;
                width: 10px;
                height: 100%;
                left: 0;
                top: 0px;
                z-index: 99;
            }
        </style>
        <div class="ooo-close" data-action="close"></div>
    </context>
</layout>


<script>
    APP.define({
        name: "web",
        type:"SubActivity",
        layout: resMap.context,
        init: function (url) {
            this.findDom('web').src = url;
            var self = this;
            
            var move_line = 0; 
            // 注册触摸开始的事件
            this.addEvent('touchstart', "close", function (dom,ev) {
                move_line = ev.touches[0].pageX;
            });
           // 注册触摸移动的事件
             this.addEvent('touchmove', "close", function (dom,ev) {
                 move_line = ev.touches[0].pageX;
                if(move_line>100){
                    SubActivity.slideout(this);
                    return ;
                }
            });
            // 触摸结束的事件
             this.addEvent('touchend', "close", function () {
                 move_line= 0;
            });


        },
        activite: function () {

        },
        sleep: function () {

        }
    });
</script>`);