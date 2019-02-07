app.res(`<app id="pwaui">
    <style id="pwa_base" type="text/css">

    .mask-bg {
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
    }
    </style>

    

    <script type="text/javascript">
        app.view({
            name: "toast",
            layout:'<span class="pwa-toast">{{=data.msg}}</span>',
            init:function(){
              app.css(\` @-webkit-keyframes toast_amin {
            0% {
                opacity: 0;
            }
            20% {
                opacity: 1;
            }
            80% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        @keyframes toast_amin {
            0% {
                opacity: 0;
            }
            20% {
                opacity: 1;
            }
            80% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        .pwa-toast {
            z-index: 99;
            margin: 0 auto;
            background-color: rgb(87, 87, 87);
            color: white;
            padding: 10px;
            padding-left: 15px;
            padding-right: 15px;
            font-size: 0.9rem;
            border-radius: 10px;
            text-align: center;
            left: 0;
            right: 0;
            opacity: 0;
            -webkit-animation-duration: 1.5s;
            -webkit-animation-fill-mode: forwards;
            -webkit-animation-name: toast_amin;
        }\`);
            },
            show: function (msg) {
                var dom = document.createElement("div");
                dom.style.cssText = "position: fixed;width: 100%;text-align: center;bottom: 10%;";
                dom.innerHTML = this.templateFn({msg:msg});
                document.body.appendChild(dom);

                dom.addEventListener("animationend", function (ev) {
                    document.body.removeChild(dom);
                });
            }
        });
    </script>
</app>`);
