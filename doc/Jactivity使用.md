##JActivity说明

####JActivity的结构

javascript的代码

```javascript
APP.define({
    name: "main",  //当前的活动的名字
    init: function () {
          //  活动创建后初始化是调用的方法
    },
    activite: function () {
          // 活动激活时调用的方法
    },
    sleep: function () {
          // 活动休眠时调用的方法
    },
    destroy:function(){
          // 活动销毁时调用的方法
    },
    template: {      //模板队列的相关对象
        demo_template: {
            data: {
              //  模板的初始的数据源
            },
            method: {
              //   模板的方法
            }
        }
    }
});
```



html布局代码

```html
<context>
    <!--布局的html-->
</context>

<template data-name="demo_template">
   <!--该布局的模板的html-->
</template>
```



####JActivity的生命历程

这些方法共同定义 JActivity 的整个生命周期。您可以通过实现这些方法监控 JActivity 生命周期中的三个嵌套循环：

- JActivity 的**整个生命周期**发生在 `init()` 调用与 `destroy()` 调用之间。您的 JActivity 应在 `init()` 中执行“全局”状态设置（例如向服务器来取该活动中所要的公共数据），并释放 `destroy()` 中的所有其余资源。例如，如果您的 JActivity 有一个在后台运行的线程，用于从网络上下载数据，它可能会在`init()` 中创建该线程，然后在 `destroy()` 中停止该线程。

- JActivity 的**可见生命周期**发生在 `activite()` 调用与 `sleep()` 调用之间。在这段时间，用户可以在屏幕上看到 JActivity 并与其交互。 例如，当一个新 JActivity 活动时，并且为了J Activity 不再可见时，用户会调用 `sleep()`。您可以在调用这两个方法之间保留向用户显示 Activity 所需的资源。 在 JActivity 的整个生命周期，当JActivity 在对用户可见和隐藏两种状态中交替变化时，系统可能会多次调用 `activite()` 和 `sleep()`。


#### JActivity 生命周期回调方法

```javascript
/**
 * [init 该活动对象一开始创建,要调用的方法]
 * @param data  传入该方法的值,可以为空
 * @returns {JActivity}  当前的活动对象
 */
JActivity.init(data);
```

```javascript
/**
 * [activite 该活动对象激活时,要调用的方法]
 * @param data  传入该方法的值,可以为空
 * @returns {JActivity}  当前的活动对象
 */
JActivity.activite(data);
```

```javascript
/**
 * [sleep 该活动对象休眠时,要调用的方法]
 * @param data  传入该方法的值,可以为空
 * @returns {JActivity}  当前的活动对象
 */
JActivity.sleep(data);
```

```javascript
/**
 * [destroy 该活动对象销毁前,要调用的方法]
 */
JActivity.destroy();
```


## 启动 JActivity

启动 JActivity 分成两种模式,一种是全局启动,另外一种是另外一个已经存在的活动,引导启动

**全局启动**

```javascript
APP.loadGlobalJActivity("main","main").init().activite();
```

说明: 第一个main是表示当前要加载的活动名称 第二个main代表的是加载活动对象的名称

APP.loadGlobalJctivity接口说明

```javascript
/**
 * @param modname 要加载活动的名称
 * @param runname 加载活动对象的名称
 * @param type 加载活动的类型 可以为空 默认为JActivity
 * @returns {*|JActivity}
 */
APP.loadGlobalJActivity(modname, runname, type)
```



**引导启动**

```javascript
this.loadActivity("child","child",child_activity).init().activite();
```

说明: 第一个child是表示当前要加载的活动名称 第二个child代表的是加载活动对象的名称,第三个参数表示需要将活动加入到那个dom布局元素中



JActivity.loadActivity接口说明

```javascript
  /**
     * 通过引导方式加载一个activity活动
     * @param modname 要加载活动的名称
     * @param runname 加载活动对象的名称
     * @param targetLoadDom 加入到那个dom布局元素中
     * @param type 加载活动的类型 可以为空 默认为JActivity
     * @returns {*|JActivity}
     */
    JActivity.loadActivity: function(modname, runname, targetLoadDom, type);
```

