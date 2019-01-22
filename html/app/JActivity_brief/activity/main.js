APP.define({
    name: "main",  //当前的活动的名字
    init: function () {
          //  活动创建后初始化是调用的方法
        var child_activity = this.findDom("child-activity");
        //通过引导的方式,启动一个活动,并且将该活动放置到父活动中的name为child-activity的元素中
       this.loadActivity("child","child",child_activity).init().activite();

    },
    activite: function () {
          // 活动激活时调用的方法
    },
    sleep: function () {
          // 活动休眠时调用的方法
    },
    destroy:function(){
          // 活动销毁时调用的方法
    },
    template: {      //模板队列的相关对象
        demo_template: {
            data: {
              //  模板的初始的数据源
            },
            method: {
              //   模板的方法
            }
        }
    }
});
