# 设计模式

## 概念

 软件设计模式（Software Design Pattern），又称设计模式 。 它描述了在软件设计过程中的一些`不断重复发生`的`问题`，以及该问题的`解决方案`。 

 它是解决**特定问题**的一系列**套路** ， 是前辈们的**代码设计**经验的**总结** 。

 **其目的是为了提高代码的可重用性、代码的可读性和代码的可靠性。** 

## 基本要素

 最关键的元素包括以下 4 个主要部分 ：

1. 模式名称  PatternName

     每一个模式都有自己的名字，有助于我们理解和记忆该模式 。

2. 问题  Problem 

    描述了该模式的应用环境，即何时使用该模式。

3. 解决方案  Solution 

    设计的组成成分、它们之间的相互关系及各自的职责和协作方式 

4. 效果  Consequence 

    模式的应用效果以及使用该模式应该权衡的问题，即模式的优缺点 

## 如何正确使用

 设计模式不是为每个人准备的，而是基于业务来选择设计模式，需要时就能想到它。 

 要明白一点，技术永远为业务服务，技术只是满足业务需要的一个工具。我们需要掌握每种设计模式的应用场景、特征、优缺点，以及每种设计模式的关联关系，这样就能够很好地满足日常业务的需要。 

 不能为了使用设计模式而去做架构，而是有了做架构的需求后，发现它符合某一类设计模式的结构，在将两者结合。 

## 前端常用的七种设计模式

### 单例模式

 单例模式可能是设计模式里面最简单的模式了，虽然简单，但在我们日常生活和编程中却经常接触到 。

 **单例模式** （Singleton Pattern）又称为单体模式，***保证一个类只有一个实例，并提供一个访问它的全局访问点*** 。 也就是说，当再次创建时，应该得到与第一次创建完全相同的对象。 

#### 你曾经遇见过的单例模式测试镜像

还记得那句让人泪奔的话嘛？他是谁的儿子,谁的丈夫,又会是谁的父亲？无论你如何称呼他，他永远只有一个。

当我们在电脑上玩经营类的游戏，经过一番眼花缭乱的骚操作好不容易走上正轨，夜深了我们去休息，第二天打开电脑，发现要从头玩，立马就把电脑扔窗外了，所以一般希望从前一天的进度接着打，这里就用到了存档。每次玩这游戏的时候，我们都希望拿到`同一个存档`接着玩，这就是属于单例模式的一个实例。 

编程中也有很多对象我们只需要唯一一个，比如数据库连接、浏览器中的 window/document 等，如果创建多个实例，会带来资源耗费严重，或访问行为不一致等情况。 

 类似于数据库连接实例，我们可能频繁使用，但是创建它所需要的开销又比较大，这时只使用一个数据库连接就可以节约很多开销。一些文件的读取场景也类似，如果文件比较大，那么文件读取就是一个比较重的操作。比如这个文件是一个配置文件，那么完全可以将读取到的文件内容缓存一份，每次来读取的时候访问缓存即可，这样也可以达到节约开销的目的。



在类似场景中，这些例子有以下特点：

1. 每次访问者来访问，返回的都是**同一个实例**；
2. 如果一开始实例没有创建，那么这个特定类需要自行创建这个实例；

####  实例的代码实现

 在 JavaScript 中使用字面量方式创建一个新对象时，实际上没有其他对象与其类似，因为新对象已经不是单例了：

```js
{ a: 1 } === { a: 1 } 		// false
```

那么问题来了，如何对构造函数使用 `new` 操作符创建多个对象时，仅获取同一个单例对象呢。 

对于刚刚打经营游戏的例子，我们可以用 JavaScript 来实现一下： 

 ```js
// 存档类
function ManageGame() {
  // 判断是否已经有单例了，无单例赋值
  ManageGame._schedule = ManageGame._schedule || this;
  return ManageGame._schedule;
}

// 获取存档实例
ManageGame.getInstance = function () {
  // 判断是否已经有单例了，无单例生成
  ManageGame._schedule = ManageGame._schedule || new ManageGame();
  return ManageGame._schedule;
};

const schedule1 = new ManageGame();
const schedule2 = ManageGame.getInstance();
const schedule3 = new ManageGame();

console.log(schedule1 === schedule2, schedule1 === schedule3); // true

 ```

稍微解释一下，这个构造函数在自己身上维护一个实例，第一次执行 `new` 的时候判断这个实例有没有创建过，创建过就直接返回，否则走创建流程。 

 我们可以用 ES6 的 class 语法改造一下： 

```js
class ManageGame {
  static _schedule = null;
  static getInstance = function () {
    ManageGame._schedule = ManageGame._schedule || new ManageGame();
    return ManageGame._schedule;
  };

  constructor() {
    ManageGame._schedule = ManageGame._schedule || this;
    return ManageGame._schedule;
  }
}

const schedule1 = new ManageGame();
const schedule2 = ManageGame.getInstance();
const schedule3 = new ManageGame();

console.log(schedule1 === schedule2, schedule1 === schedule3); // true
```

上面方法的缺点在于维护的实例作为静态属性直接暴露，外部可以直接修改。

假如用户将属性值修改，那么单例就会失效。

```js
ManageGame._schedule = null;
```

#### 通用实现

仍然是利用 _schedule 来保存单例，主要思想就是将其隐藏，只读或者不向外暴露。

```js
const ManageGame = (function () {
  let _schedule = null;
  let ManageGame = function () {
    _schedule = _schedule || this;
    return _schedule;
  };
  ManageGame.getInstance = function () {
    _schedule = _schedule || new ManageGame();
    return _schedule;
  };
  return ManageGame;
})();

const schedule1 = new ManageGame();
const schedule2 = ManageGame.getInstance();
const schedule3 = new ManageGame();

console.log(schedule1 === schedule2, schedule1 === schedule3); // true
```

#### 惰性单例、懒汉式-饿汉式

有时候一个实例化过程比较耗费性能的类，但是却一直用不到，如果一开始就对这个类进行实例化就显得有些浪费，那么这时我们就可以使用**惰性创建**，即延迟创建该类的单例。之前的例子都属于惰性单例，实例的创建都是 `new` 的时候才进行。 

 惰性单例又被成为**懒汉式**，相对应的概念是**饿汉式**： 

- 懒汉式单例是在使用时才实例化
- 饿汉式是当程序启动时或单例模式类一加载的时候就被创建。

```js
class FuncClass {
  constructor() {
    this.bar = "bar";
  }
}

// 饿汉式
const HungrySingleton = (function () {
  // 运行到此处就初始化
  const _instance = new FuncClass();

  return function () {
    return _instance;
  };
})();

// 懒汉式
const LazySingleton = (function () {
  let _instance = null;

  // 实例化时在初始化 new fn()
  return function () {
    return _instance || (_instance = new FuncClass());
  };
})();

const visitor1 = new HungrySingleton();
const visitor2 = new HungrySingleton();
const visitor3 = new LazySingleton();
const visitor4 = new LazySingleton();

console.log(visitor1 === visitor2); // true
console.log(visitor3 === visitor4); // true
```

#### 源码中的单例模式

以 ElementUI 为例，ElementUI 中的全屏 Loading 蒙层调用有两种形式：

```javascript
// 1. 指令形式
Vue.use(Loading.directive)
// 2. 服务形式
Vue.prototype.$loading = service
```

1. 上面的是指令形式注册，使用的方式 `...`；
2. 下面的是服务形式注册，使用的方式 `this.$loading({ fullscreen: true })`；

用服务方式使用全屏 Loading 是单例的，即在前一个全屏 Loading 关闭前再次调用全屏 Loading，并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例。

下面我们可以看看 ElementUI 2.9.2 的[源码](https://github.com/ElemeFE/element/blob/v2.9.2/packages/loading/src/index.js)是如何实现的，为了观看方便，省略了部分代码：

```javascript
import Vue from 'vue'
import loadingVue from './loading.vue'

const LoadingConstructor = Vue.extend(loadingVue)

let fullscreenLoading

const Loading = (options = {}) => {
    if (options.fullscreen && fullscreenLoading) {
        return fullscreenLoading
    }

    let instance = new LoadingConstructor({
        el: document.createElement('div'),
        data: options
    })

    if (options.fullscreen) {
        fullscreenLoading = instance
    }
    return instance
}

export default Loading
```

这里的单例是 `fullscreenLoading`，是存放在闭包中的，如果用户传的 `options` 的 `fullscreen` 为 true 且已经创建了单例的情况下则回直接返回之前创建的单例，如果之前没有创建过，则创建单例并赋值给闭包中的 `fullscreenLoading` 后返回新创建的单例实例。

这是一个典型的单例模式的应用，*通过复用之前创建的全屏蒙层单例，不仅减少了实例化过程，而且避免了蒙层叠加蒙层出现的底色变深的情况。*

#### 优缺点

单例模式主要解决的问题就是**节约资源与保持访问一致性**。 

缺点：单例模式对扩展不友好，一般**不容易扩展**，因为单例模式一般自行实例化，没有接口；

#### 使用场景

1. 当一个类的**实例化过程消耗的资源过多**，可以使用单例模式来避免性能浪费；
2. 当项目中需要一个公共的状态，那么需要使用单例模式来**保证访问一致性**；