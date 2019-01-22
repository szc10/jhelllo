app.css(`.slideout {
    -webkit-animation-duration: .3s;
    -webkit-animation-fill-mode: forwards;
}

.slidein {
    -webkit-animation-duration: .3s;
    -webkit-animation-fill-mode: forwards;
}


@-webkit-keyframes slidein {
    from {
        -webkit-transform: translate3d(100%, 0, 0);
      
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
      
    }
}

@-webkit-keyframes slideout {
    from {
        -webkit-transform: translate3d(0, 0, 0);
       
    }
    to {
        -webkit-transform: translate3d(100%, 0, 0);
        
    }
}`

);

class SubActivity extends JActivity {
    constructor(con) {
        super(con);
        // 设置返回的监听事件
        this.addEvent("click", "back", function () {
            SubActivity.slideout(this);
        });
    }
    static init(){
        if (!SubActivity.fnArr) {
            SubActivity.fnArr = {};
            document.addEventListener("animationend", function (ev) {
                ev.target.style["-webkit-animation-name"] = null;
                J(ev.target).removeClass(ev.target.dataset.amfn);
                if (SubActivity.fnArr[ev.target.dataset.amfn]) {
                    SubActivity.fnArr[ev.target.dataset.amfn].call(ev.target);
                    delete SubActivity.fnArr[ev.target.dataset.amfn];
                }
            }.bind(SubActivity));
        }
    }
    static ctr (dom, con, fn) {
        SubActivity.init();
        J(dom).addClass(con);
        dom.dataset.amfn = con;
        dom.style["-webkit-animation-name"] = con;
        SubActivity.fnArr[con] = fn;
    }
    static slidein(pactivity, oactivity) {
        oactivity.activite();
        oactivity.parent = pactivity;
        SubActivity.ctr(oactivity.getContext(), "slidein", function () {
            pactivity.sleep();
            // 如果动画完成调用,动画完成时候的函数
            if(oactivity.amFinished){
                oactivity.amFinished();
            }
        });
    }
    static slideout(activity) {
        activity.parent.activite();
        SubActivity.ctr(activity.getContext(), "slideout", function () {
            activity.destroy();
        });
    }
}
