##jemplate说明

####jtemplate

####jtemplate的生命历程

jtemplate文档是跟随一个jactivity的加载而加载,它有一个简单的生命周期 create -> activite -> sleep -> destroy

在引擎中创建的jtemplate实例不会被系统保存,需要开发根据相关的需求手动保存

####如何创建一个jtemplate

jtemplate 分成一个简单模板和复杂模板 

一个简单的jtemplate 在文档中 只有相关的html 例如

```html
<context>
     <!--Jactivity的相关内容-->
</context>
<template data-name="context_list">
    <ul>
        {{ for(var k in data.str) {  var title = data.str[k]; }}
        <li>
            <div class="article-md-img-box" data-action="right-from">
                <img class="lazy"  src="img/img.jpg"
                     style="display: inline;">
            </div>
            <div class="article-info-box" data-action="right-from">
                <div class="article-md-title">{{=title}}</div>
            </div>
        </li>
        {{ } }}
        </ul>
</template>
```

这样的文档,使用template标签包裹 其data-name属性写明改模板的名字

在文档中,可以使用相关的js语法对模板的数据源进行渲染,每一句js必须要用{{  }}引用,引擎才会识别这个是要执行的js语句

这样创建jtemplate的,在实例化后,其绑定的数据源默认为空,需要后期绑定

该布局文档撰写在context标签的下方



一个复杂的jtemplate 在文档中 有html,js的数据源,方法 例如

```html
<context>
     <!--Jactivity的相关内容-->
</context>
<template data-name="up_context_list">
    <ul>
        {{ for(var k in data.str) {  var title = data.str[k]; }}
        <li>
            <div class="article-md-img-box" data-action="right-from">
                <img class="lazy"  src="img/img.jpg"
                     style="display: inline;">
            </div>
            <div class="article-info-box" data-action="right-from">
                <div class="article-md-title">{{=method.changeText(title)}}</div>
            </div>
        </li>
        {{ } }}
    </ul>
</template>
```

```javascript
 template: {
        up_context_list: {
            data: {
                str:{
                    a: "atitle",
                    b: "btitle",
                    c: "ctitle",
                    b: "btitle"
                }
            },
            method: {
                changeText: function(str) {
                   return str+1;
                }
            }
        }
    }
```



这样的文档,使用template标签包裹 其data-name属性写明改模板的名字

在文档中,可以使用相关的js语法对模板的数据源进行渲染,每一句js必须要用{{  }}引用,引擎才会识别这个是要执行的js语句

在内嵌的js中可以使用该模板绑定的方法,通过关键词method引入,数据源通过data关键词引入

在activity的上下文中可以在活动的template中可以定义包括 这个模板的所需要的相应的方法,初始的数据源,其键值为之前data-name的值,否则引擎无法找到

在这个对象中包含连个子对象data(数据源) method(该模板的绑定的方法),书写格式以上为准

这样创建jtemplate的,在实例化后,其绑定的数据源Jactivity上下文中对象的data子对象

该布局文档撰写在context标签的下方

####如何使用jtemplate

```javascript
var template = this.loadTemplate("jtemplate的名字", 要放入的dom元素的指针);
```

此时,一个jtemplate对象就创建出来了,并且已经放入到相应的dom元素的上下文中了

**jtempate的相关方法**

```javascript
/**
 * [start 开始渲染当前的模板的数据,并且会绘制到屏幕中]
 * @param key 传入数据源的键值
 * @param data  传入数据源的值
 * @returns {JTemplate}  当前的模板对象
 */
JTemplate.start(key,data);
```


```javascript
/**
 * [setData 修改数据源的值]
 * @param key 传入数据源的键值
 * @param data  传入数据源的值
 * @returns {JTemplate}  当前的模板对象
 */
JTemplate.setData(key,data);
```

```javascript
/**
 * [activite 将模板绘制到屏幕中]
 * @returns {JTemplate}  当前的模板对象
 */
JTemplate.activite();
```

```javascript
/**
 * [sleep 隐藏当前的模板,但是不销毁]
 * @returns {JTemplate}  当前的模板对象
 */
JTemplate.sleep();
```

```javascript
/**
 * [getContext 获取当前模板的布局dom]
 * @returns {Element|*}  获取当前模板的布局dom
 */
JTemplate.getContext();  
```

```javascript
/**
 * [destroy 销毁当前的模板对象]
 */
JTemplate.destroy();
```

