
APP.define({
    name: "main",
    type: "NavigationDrawerActivity",
    init: function (data) {
        var side_nav = this.findDom("side-nav");

        var sided = new SideNav(side_nav);

        this.addEvent("click", "open-side-nav", function() {
            sided.display();
        });

    },
    activite: function () {

    },
    sleep: function () {
        //console.log("sleep");
    }
});