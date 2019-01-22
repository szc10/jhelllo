class BottomNavigationActivity extends JActivity {
    constructor(newActivityAction) {
        super(newActivityAction);
        var point = this;
        var point = this;
        this._preInit = function () {
            var action = this.config.name + '_nav';
            var main_nav = this.findDom('nav');
            var nav = J(main_nav).domAll('li');
            for (var i = 0; nav.length > i; i++) {
                nav[i].dataset.action = action;
            }
            //
        };
        this.TabDel = function () {
            var action = point.config.name + '_nav';
            var main_nav = point.findDom('nav');
            var context = point.findDom('main-context');
            var model = [];
            var currentModel = null;
            var nav = J(main_nav).domAll('*[data-action="' + action + '"]');
            this.addEvent("click", action, function (dom) {
                for (var k = 0; nav.length > k; k++) {
                    var one = nav[k];
                    J(one).removeClass('active');
                }
                currentModel.sleep();
                J(dom).addClass('active');
                model[dom.dataset.target].activite();
                currentModel = model[dom.dataset.target];
            });

            var fn = {
                add: function (config) {
                    var name = config.name;
                    model[name] = point.loadActivity(name, name, context).init();
                    return fn;
                },
                init: function (name) {
                    model[name].activite();
                    currentModel = model[name];
                    J(main_nav).domFirst('*[data-target="' + name + '"]').className = "active";
                    return fn;
                }
            };
            return fn;
        };
    }
}