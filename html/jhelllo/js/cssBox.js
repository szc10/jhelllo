app.css(`
*,
html,
body,
header,
section,
footer,
div,
ul,
ol,
li,
img,
a,
span,
em,
del,
legend,
center,
strong,
var,
fieldset,
form,
label,
dl,
dt,
dd,
cite,
input,
time,
mark,
code,
figcaption,
figure,
textarea,
h1,
h2,
h3,
h4,
h5,
h6,
p {
    margin: 0;
    border: 0;
    padding: 0;
    font-style: normal;
}

* {
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: none;
    -webkit-touch-callout: none;
    -webkit-font-smoothing: antialiased;
    color: #333;
}

*::-webkit-scrollbar {
    background: transparent;
    width: 0px;
    -webkit-appearance: none;
}

/* 设置字体 */
html{
    font-family: Microsoft YaHei,"Microsoft YaHei UI",Tahoma,Arial,"Helvetica Neue","Hiragino Sans GB",Simsun,sans-self !important;
}
html,
body {
    -webkit-touch-callout: none;
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    font-size: 14px;
}

.uiactivity,
UIactivity {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    /*will-change: transform;*/
    /*transition:  all .4s ease-out;*/
    margin: 0;
    padding: 0;
    top: 0px;
    left: 0px;
    display: none;
}

viewport {
    display: block;
    width: 100%;
    height: 100%;
}

.uiactivity {
    z-index: -1;
}

.uiactivity context,
UIactivity context {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: auto;
    margin: 0;
    padding: 0;
    top: 0px;
    left: 0px;
    /*display: none;*/
    background-color: #fff;
}

nav,
article,
aside,
details,
main,
header,
footer,
section,
fieldset,
figcaption,
figure {
    display: block;
}

img,
a,
button,
em,
del,
strong,
var,
label,
cite,
small,
time,
mark,
code,
textarea {
    display: inline-block;
}

header,
section,
footer {
    position: relative;
}

ol,
ul {
    list-style: none;
}

input,
button,
textarea {
    border: 0;
    margin: 0;
    padding: 0;
    font-size: 1em;
    line-height: 1em;
    -webkit-appearance: none;
    background-color: rgba(0, 0, 0, 0);
}


/*取消chrome 选择以后的奇怪样式*/

div:focus,
input:focus,
button:focus,
textarea:focus {
    outline: 0;
}

span {
    display: inline-block;
}

a:active,
a:hover {
    outline: 0;
}

a,
a:visited {
    text-decoration: none;
}

label {
    word-wrap: break-word;
    word-break: break-all;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

td,
th {
    padding: 0;
}

button {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-decoration: none;
    border-radius: 3px;
    font-size: 16px;
    /* font-weight: bold; */
    line-height: 1.5;
    color: #333;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-appearance: none;
    cursor: pointer;
}

.flex-wrap {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}

.flex-wrap li {
    flex: 1;
}
`);