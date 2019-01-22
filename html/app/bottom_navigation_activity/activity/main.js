
APP.define({
    name: "main",
    type: "BottomNavigationActivity",
    init: function (data) {
        this.TabDel().add({
            name: "my"
        }).add({
            name: "goodAll"
        }).add({
            name: "indexPage"
        }).add({
            name: "notice"
        }).init("indexPage");
    },
    activite: function () {

    },
    sleep: function () {
        //console.log("sleep");
    }
});