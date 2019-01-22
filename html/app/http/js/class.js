class NavigationDrawerActivity extends JActivity {
    constructor(newActivityAction) {
        super(newActivityAction);
        var point = this;

        this.TabDel = function(nav, context, side) {
            var action = point.config.name + '_nav';
            var model = [];
            var currentModel = null;
            var navArr = J(nav).domAll('li');
            // var navArr = J(nav).domAll('*[data-action="' + action + '"]');

            for (var i = 0; navArr.length > i; i++) {
                if (!navArr[i].dataset.action) navArr[i].dataset.action = "";
                navArr[i].dataset.action += " " + action;
            }
            this.addEvent("click", action, function(dom) {
                for (var k = 0; navArr.length > k; k++) {
                    var one = navArr[k];
                    J(one).removeClass('active');
                }

                side.close(() => {
                    currentModel.sleep();
                    J(dom).addClass('active');
                    model[dom.dataset.target].activite();
                    currentModel = model[dom.dataset.target];
                });
            });

            var fn = {
                add: function(config) {
                    var name = config.name;
                    model[name] = point.loadActivity(name, name, context).init();

                    return fn;
                },
                init: function(name) {
                    model[name].activite();
                    currentModel = model[name];
                    J(nav).domFirst('*[data-target="' + name + '"]').className = "active";
                    return fn;
                }
            };
            return fn;
        };
    }
}

class SideNav {
    constructor(dom) {
        this.speed = .25; //默认的展开速度

        this.mask = dom.getElementsByClassName("mask-bg")[0];
        this.slide = dom.getElementsByClassName("side-nav-list")[0];
        this.slideTran = new Transition(this.slide);
        this.maskTran = new Transition(this.mask);
        this.slideTran.setDuration(this.speed);
        this.maskTran.setDuration(this.speed);
        J(this.mask).click(() => {
            this.close();
        });

    }
    display() {
        this.maskTran.setOpacity(0).getDisplay().setOpacity(1);
        this.slideTran.set3dCoordinate({
            x: "-" + J(this.slide).getcss('width')
        }).getDisplay().set3dCoordinate({
            x: 0
        });
    }
    close(fn) {
        this.maskTran.setOpacity(0);
        this.slideTran.set3dCoordinate({
            x: "-" + J(this.slide).getcss('width')
        }).then(() => {
            J(this.mask).setcss('display', 'none');
            J(this.slide).setcss('display', 'none');
            if (typeof fn == "function") {
                fn();
            }
        });
    }
}

app.css(` .mask-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(80, 80, 80, 0.5);
    top: 0;
    display: none;
}

.side-nav-list {
    position: absolute;
    width: 300px;
    height: 100%;
    background-color: #f6f6f6;
    top: 0;
    display: none;
    overflow: scroll;
}`);