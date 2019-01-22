##jsBox.js 1.0.2 文档说明

####dom处理函数说明

#####事件处理

```javascript
/**
 * [click 向dom元素绑定click方法]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[fn]} fun [要绑定事件的函数]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).click(fun);
```
```javascript
 /**
 * [dblclick 向dom元素绑定dblclick方法]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[fn]} fun [要绑定事件的函数]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).dblclick(fun);
```
```javascript
 /**
 * [change 向dom元素绑定change方法]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[fn]} fun [要绑定事件的函数]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).change(fun);
```
```javascript
 /**
 * [focus 向dom元素绑定focus方法]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[fn]} fun [要绑定事件的函数]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).focus(fun);
```
```javascript
 /**
 * [blur 向dom元素绑定blur方法]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[fn]} fun [要绑定事件的函数]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).blur(fun);
```
```javascript
 /**
 * [touchstart 向dom元素绑定touchstart方法]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[fn]} fun [要绑定事件的函数]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).touchstart(fun);
```
```javascript
 /**
 * [touchend 向dom元素绑定touchend方法]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[fn]} fun [要绑定事件的函数]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).touchend(fun);
```
```javascript
 /**
 * [mousemove 向dom元素绑定mousemove方法]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[fn]} fun [要绑定事件的函数]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).mousemove(fun);
```
```javascript
 /**
 * [mouseout 向dom元素绑定mouseout方法]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[fn]} fun [要绑定事件的函数]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).mouseout(fun);
```


#####css处理部分
```javascript
 /**
 * [setcss 设置元素的domCSS样式]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[str]} type [要修改css的属性名]
 * @param  {[str]} value [要修改css的属性值]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).setcss(type,value);
```
```javascript
 /**
 * [getcss 从内存中得到dom的某个样式]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[str]} type [要要获得样式的名称]
 * @return {[str]}     [返回样式的属性值]
 */
J(testDom).getcss(type);
```
```javascript
 /**
 * [addClass 向dom元素增加一个样式表]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[str]} className [增加的样式表名]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).addClass(className);
```
```javascript
 /**
 * [removeClass 向dom元素移除一个样式表]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[str]} className [移除的样式表名]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).removeClass(className);
```
```javascript
 /**
 * [toggleClass 向dom元素动态移除或增加一个样式表]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[str]} className [样式表名]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).toggleClass(className);
```

#####其他处理部分

```javascript
/**
 * [setValue 设置元素的value值]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[str]} value [要设置的value名称]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).setValue(vlaue);
```

```javascript
/**
 * [getValue 设置元素的value值]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @return {[str]}     [改元素的value值]
 */
J(testDom).getValue();
```

```javascript
/**
 * [setHtml 设置元素其中的innerHTML值]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[str]} html [要设置的html内容]
 * @return {[J]}     [返回一个标准的处理对象指针]
 */
J(testDom).setHtml(html);
```

```javascript
/**
 * [getHtml 获取元素其中的innerHTML值]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @return {[str]}     [元素其中的innerHTML值]
 */
J(testDom).getHtml();
```
```javascript
/**
 * [append 向目标元素的innerHTML增加新的代码]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[str]}  str   [元素其中的innerHTML值]
 * @return {[J]}   [返回一个标准的处理对象指针]
 */
J(testDom).append(str);
```
```javascript
/**
 * [domAll 在当前元素内,匹配一个特定选择器的所有的元素]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[str]} str  [是一个由逗号连接的包含一个或多个CSS选择器的字符串]
 * @return {[NodeList]}          [获取元素的指针数组]
 */
J(testDom).domAll(str);
```
```javascript
/**
 * [domFirst 在当前元素内,匹配一个特定选择器的第一个元素]
 * @param  {[str/dom]} testDom [dom元素的id或者是dom元素指针]
 * @param  {[str]} str  [是一个由逗号连接的包含一个或多个CSS选择器的字符串]
 * @return {[Node]}          [获取元素的指针]
 */
J(testDom).domFirst(str);
```

####网络处理部分

建立ajax请求接口

``` javascript
/**
 * Jajax JavaScript Library v0.1.0
 * https://github.com/szc10/Jajax
 * @param config
 * 以一个参数对象的形式传入
 *  config.url: string,  请求的地址,不可省
 *  config.data: object,     请求的对象,可省
 *  config.type: "post||get", 请求的方式,可省,默认post
 *  config.json_back: boolean, 请求回的数据json序列化,可省,默认false
 *  config.file: object,要发送的文件,可省,如果请求方式为get,则自动忽略
 *  config.complete: function, 请求成功后的处理函数,不可省
 *  config.callback: function, 请求完成后的处理函数,可省
 *  config.error: function,   请求失败后的处理函数,可省
 *
 */
Jajax(config);
```

获取/存储cookic

```javascript
/**
 * [设置相应cookic值]
 * @param {[type]} key        [cookic的键值]
 * @param {[type]} value      [cookic的值]
 * @param {[type]} expiredays [过期时间,按天算]
 */
Cookie.set(key, value, expiredays);
```

```javascript
/**
* [通过相应的键值,获取cookic值]
* @param  {[type]} key [description]
* @return {[type]}     [description]
*/
Cookie.get(key);
```

URL模块

```javascript
/**
 * [获取URL中的get字段]
 * @param  {[type]} {get数据请求的键值}
 * @return {[type]}   [根据键值返回相应的值]
 */
$_GET[key];
```

```javascript
/**
* [通过键值对更新锚链接]
* @param  {[object]} hashArray [更新锚链接的键值对]
* @return {[type]}             [description]
*/
URLrouter.updateHash(hashArray);
```
```javascript
/**
 * [删除锚链接其中的一个值]
 * @param  {[string]} hashKey [要删除那个锚链接的键值]
 * @return {[type]}           [description]
 */
URLrouter.deleteHash(hashKey);
```
```javascript
/**
 * [页面跳转]
 * @param  {[str]} url [页面跳转的url]
 * @return {[type]}     [description]
 */
URLrouter.jumpUrl(url);
```



###模板引擎

**模板的使用,首先要获取模板文件,创建模板类**

```javascript
/**
 * [创建模板类]
 * @param  {[Node/str]} tmpl [可以是内含模板内容的script标签Node,可以是其id,也可以是模板字符串]
 * @return {[point]}     [模板的指针]
 */
var jtmpl = new Jtmpl(tmpl);
```

**对应的接口**

```javascript
/**
 * [输入数据源,获取渲染好的htm代码]
 * @param  {[ob/arr]} data [填充模板的数据源]
 * @return {[str]}     [渲染好的html代码]
 */
jtmpl.createHtml(data);
```

