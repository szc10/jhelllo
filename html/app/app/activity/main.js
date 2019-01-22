
APP.define({
    name: "main",
    type: "BottomNavigationActivity",
    init: function (data) {

        // 设置换页的信息
        this.TabDel().add({
            name: "my"
        }).add({
            name: "goodAll"
        }).add({
            name: "indexPage"
        }).add({
            name: "notice"
        }).init("indexPage");

        // 额外设置论坛系统
        this.addEvent("click","open-forum",function(){
    
            app.pwaam.slidein(this, this.loadActivity("open-forum", "open-forum").init());
            
        });
       
    },
    activite: function () {

    },
    sleep: function () {
        //console.log("sleep");
    }
});