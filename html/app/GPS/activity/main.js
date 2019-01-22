APP.define({
      name: "main", //当前的活动的名字
      init: function () {

            this.addEvent("click", "clear-url", function () {
                  window.getLbs(function (a, b) {
                        app.toast.show(a + "/" + b);
                  });
            });
            
      },
      activite: function () {
            // 活动激活时调用的方法
      },
      sleep: function () {
            // 活动休眠时调用的方法
      },
      destroy: function () {
            // 活动销毁时调用的方法
      }
});