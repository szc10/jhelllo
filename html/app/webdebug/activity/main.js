APP.define({
      name: "main", //当前的活动的名字
      init: function () {

            var urlOb = {};

            try {
                  urlOb = JSON.parse(localStorage.urlOb);
            } catch (error) {

            }


            this.addEvent('click', 'select-url', function (dom) {

                  var testData = [];
                  for (var k in urlOb) {
                        console.log(k,urlOb[k]);
                        testData.push({
                              value: 1,
                              text: urlOb[k]
                        });
                  }
                  SelectCustom.triggerSelect(dom, testData).then(function (dom) {
                        var url = dom.value;

                        SubActivity.slidein(this, this.loadActivity("web", "web").init(url));
                  }.bind(this));
            });

            this.addEvent("click", "check-url", function () {
                  var url = this.findDom("url").value;
                  urlOb[url] = url;
                  localStorage.urlOb = JSON.stringify(urlOb);
                  SubActivity.slidein(this, this.loadActivity("web", "web").init(url));
            });

            this.addEvent("click", "clear-url", function () {
                  localStorage.removeItem("urlOb");
                  urlOb = {};
                  app.toast.show("记录已经清理");
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