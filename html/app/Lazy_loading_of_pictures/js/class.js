class Lazyloadimg {
    constructor(context) {
        var num = context.getElementsByClassName('load-img').length;
        var img = context.getElementsByClassName('load-img');
        var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
        lazyload(); //页面载入完毕加载可是区域内的图片
        context.onscroll = lazyload;

        function loadimg(img) {
            img.style["background-image"] = "url(" + img.getAttribute("data-src") + ")";
        }

        function lazyload() { //监听页面滚动事件

            var seeHeight = screen.height; //可见区域高度
            var scrollTop = context.scrollTop; //滚动条距离顶部高度

            for (var i = n; i < num; i++) {

                if (img[i].offsetTop < seeHeight + scrollTop) {
                    if (!img[i].dataset.loadedsign) {
                        loadimg(img[i]);
                    }
                }
            }
        }
    }
    loadimg(img) {
        img.style["background-image"] = "url(" + img.getAttribute("data-src") + ")";
    }
}

app.css(` .load-img {
    background-image: url(banner.png);
    width: 400px;
    height: 200px;
    transition: all 500ms;
}`);