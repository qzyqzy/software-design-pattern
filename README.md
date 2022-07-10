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

## 前端常用的设计模式

### 单例模式

 单例模式可能是设计模式里面最简单的模式了，虽然简单，但在我们日常生活和编程中却经常接触到 。

 **单例模式** （Singleton Pattern）又称为单体模式，***保证一个类只有一个实例，并提供一个访问它的全局访问点*** 。 也就是说，当再次创建时，应该得到与第一次创建完全相同的对象。 

#### 你曾经遇见过的单例模式

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

### 工厂模式

根据**不同的输入**返回**不同类的实例**，一般用来创建同一类对象。比如可以获取不同的水果，西瓜，葡萄，哈密瓜等，但是它们都属于水果的。

它的主要思想是将对象的**创建**与对象的**实现分离**

#### 你曾见过的工厂模式

今天你的老同学找你来玩，你决定下个馆子（因为不会做饭），于是你来到了小区门口的饭店，跟老板说，来一份鱼香肉丝，一份宫保鸡丁。等会儿菜就烧好端到你的面前，不用管菜烧出来的过程，你只要负责吃就行了。管他怎么做的，有没有地沟油什么的，只要菜给你上了。

#### 实例的代码实现

我们可以使用 JavaScript 将上面饭馆例子实现一下：

```js
/* 饭店方法 */
function restaurant(menu) {
  switch (menu) {
    case "鱼香肉丝":
      return new YuXiangRouSi();
    case "宫保鸡丁":
      return new GongBaoJiDin();
    default:
      console.log("这个菜本店没有 -。-");
  }
}

// 鱼香肉丝类
function YuXiangRouSi() {
  this.type = "鱼香肉丝";
}

// 宫保鸡丁类
function GongBaoJiDin() {
  this.type = "宫保鸡丁";
}

const dish1 = restaurant("鱼香肉丝"); // { type: '鱼香肉丝' }
const dish2 = restaurant("红烧排骨"); // 这个菜本店没有 -。-
```

这样就完成了一个工厂模式，但是这个实现有一个问题：

工厂方法中包含了很多与创建产品相关的过程，如果产品种类很多的话，这个工厂方法中就会罗列很多产品的创建逻辑，每次新增或删除产品种类，不仅要增加产品类，还需要对应修改在工厂方法，导致这个工厂方法变得臃肿、高耦合。

严格上这种实现在面向对象语言中叫做**简单工厂模式**。适用于产品种类比较少，创建逻辑不复杂的时候使用。

#### 源码中的工厂模式

Vue-router 源码中的工厂模式：

```js
// src/index.js
export default class VueRouter {
    constructor(options) {
        this.mode = mode	// 路由模式
        
        switch (mode) {           // 简单工厂
            case 'history':       // history 方式
                this.history = new HTML5History(this, options.base)
                break
            case 'hash':          // hash 方式
                this.history = new HashHistory(this, options.base, this.fallback)
                break
            case 'abstract':      // abstract 方式
                this.history = new AbstractHistory(this, options.base)
                break
            default:
                // ... 初始化失败报错
        }
    }
}
```

#### 工厂模式的优缺点

工厂模式将**对象的创建和实现分离**，这带来了优点：

1. 良好的封装，代码结构清晰，**访问者无需知道对象的创建流程**，特别是创建比较复杂的情况下

工厂模式的缺点：

1. 带来了**额外的系统复杂度**，增加了抽象性

#### 使用场景

那么什么时候使用工厂模式呢：

1. 对象的创建比较复杂，而访问者无需知道创建的具体流程；
2. 处理大量具有相同属性的小对象；

什么时候不该用工厂模式：滥用只是增加了不必要的系统复杂度，过犹不及。

### 发布-订阅模式

在众多设计模式中，可能最常见、最有名的就是发布-订阅模式了。

发布-订阅模式又叫**观察者模式**，它定义了一种**一对多的关系**，让多个订阅者对象**同时监听某一个发布者，或者叫主题对**象，这个主题对象的**状态发生变化时**就会**通知**所有订阅自己的**订阅者对象**，使得它们能够自动更新自己。

当然有人提出发布-订阅模式和观察者模式之间是有一些区别的，但是大部分情况下你可以将他们当成是一个模式，文末会简单讨论一下他们之间的微妙区别，了解即可。

#### 你曾见过的发布发布-订阅模式

比如当我们进入一个聊天室/群，如果有人在聊天室发言，那么这个聊天室里的所有人都会收到这个人的发言。这是一个典型的发布-订阅模式，当我们加入了这个群，相当于订阅了在这个聊天室发送的消息，当有新的消息产生，聊天室会负责将消息发布给所有聊天室的订阅者。

再举个栗子，当我们去买鞋，发现看中的款式已经售罄了，售货员告诉你不久后这个款式会进货，到时候打电话通知你。于是你留了个电话，离开了商场，当下周某个时候鞋店进货了，售货员拿出小本本，给所有关注这个款式的人打电话。

这也是一个日常生活中的一个发布-订阅模式的实例，虽然不知道什么时候进货，但是我们可以登记号码之后等待售货员的电话，*不用每天都打电话问鞋子的信息*。

上面两个小例子，都属于发布-订阅模式的实例，群成员/买家属于消息的订阅者，订阅消息的变化，聊天室/售货员属于消息的发布者，在合适的时机向群成员/小本本上的订阅者发布消息。

在这样的逻辑中，有以下几个特点：

- 买家（订阅者）只要声明对消息的一次订阅，就可以在未来的某个时候接受来自售货员（发布者）的消息，不用一直轮询消息的变化
- 售货员（发布者）持有一个小本本（订阅者列表），需要在消息发生时挨个去通知小本本上的订阅者，当订阅者增加或减少时，只需要在小本本上增删记录即可；

#### 实例的代码实现

我们可以将鞋店的例子提炼一下，用 JavaScript 来实现：

```js
const shoesPub = {
  shoeBook: [], // 售货员的小本本
  subShoe(phoneNumber) {
    // 买家在小本本是登记号码
    this.shoeBook.push(phoneNumber);
  },
  notify() {
    // 售货员打电话通知小本本上的买家
    for (const customer of this.shoeBook) {
      customer.update();
    }
  },
};

const customer1 = {
  phoneNumber: "152xxx",
  update() {
    console.log(this.phoneNumber + ": 去商场看看");
  },
};

const customer2 = {
  phoneNumber: "138yyy",
  update() {
    console.log(this.phoneNumber + ": 给表弟买双");
  },
};

shoesPub.subShoe(customer1); // 顾客登记
shoesPub.subShoe(customer2); // 顾客登记

// 鞋子来了
shoesPub.notify(); // 打电话通知买家到货了
```

这样我们就实现了在有新消息时对买家的通知。

当然还可以对功能进行完善，比如：

- 在登记号码的时候进行一下判重操作，重复号码就不登记了；
- 买家登记之后想了一下又不感兴趣了，那么以后也就不需要通知了，增加取消订阅的操作；

```js
const shoesPub = {
  shoeBook: [], // 售货员的小本本
  subShoe(phoneNumber) {
    // 买家在小本本是登记号码
    // 判重处理
    if (!this.shoeBook.includes(phoneNumber)) {
      this.shoeBook.push(phoneNumber);
    }
  },
  // 取消订阅
  unSubShoe(customer) {
    if (!this.shoeBook.includes(customer)) return;
    const idx = this.shoeBook.indexOf(customer);
    this.shoeBook.splice(idx, 1);
  },
  notify() {
    // 售货员打电话通知小本本上的买家
    for (const customer of this.shoeBook) {
      customer.update();
    }
  },
};

const customer1 = {
  phoneNumber: "152xxx",
  update() {
    console.log(this.phoneNumber + ": 去商场看看");
  },
};

const customer2 = {
  phoneNumber: "138yyy",
  update() {
    console.log(this.phoneNumber + ": 给表弟买双");
  },
};

shoesPub.subShoe(customer1); // 顾客登记
shoesPub.subShoe(customer1); // 顾客登记
shoesPub.subShoe(customer2); // 顾客登记

// 顾客取消登记
shoesPub.unSubShoe(customer1);

// 鞋子来了
shoesPub.notify(); // 打电话通知买家到货了
```

到现在我们已经简单完成了一个发布-订阅模式。

但是还可以继续改进，比如买家可以关注不同的鞋型，那么当某个鞋型进货了，只通知关注了这个鞋型的买家，总不能通知所有买家吧。

#### 发布-订阅的通用实现

主要有下面几个概念：

1. **Publisher** ：发布者，当消息发生时负责通知对应订阅者
2. **Subscriber** ：订阅者，当消息发生时被通知的对象
3. **SubscriberMap** ：持有不同 type 的数组，存储有所有订阅者的数组
4. **type** ：消息类型，订阅者可以订阅的不同消息类型
5. **subscribe** ：该方法为将订阅者添加到 SubscriberMap 中对应的数组中
6. **unSubscribe** ：该方法为在 SubscriberMap 中删除订阅者
7. **notify** ：该方法遍历通知 SubscriberMap 中对应 type 的每个订阅者

```js
const Publisher = (function () {
  const _subsMap = {}; // 存储订阅者
  return {
    // 消息订阅
    subscribe(type, cb) {
      if (_subsMap[type]) {
        if (!_subsMap[type].includes(cb)) {
          _subsMap[type].push(cb);
        }
      } else {
        _subsMap[type] = [cb];
      }
    },
    // 消息退订
    unsubscribe(type, cb) {
      if (!_subsMap[type] || !_subsMap[type].includes(cb)) return;
      const idx = _subsMap[type].indexOf(cb);
      _subsMap[type].splice(idx, 1);
    },
    // 消息发布
    notify(type, message) {
      if (!_subsMap[type]) return;
      _subsMap[type].forEach((cb) => cb(message));
    },
  };
})();

Publisher.subscribe("运动鞋", (message) => console.log("152xxx" + message)); // 订阅运动鞋
Publisher.subscribe("运动鞋", (message) => console.log("138yyy" + message));
Publisher.subscribe("帆布鞋", (message) => console.log("139zzz" + message)); // 订阅帆布鞋

Publisher.notify("运动鞋", " 运动鞋到货了 ~"); // 打电话通知买家运动鞋消息
Publisher.notify("帆布鞋", " 帆布鞋售罄了 T.T"); // 打电话通知买家帆布鞋消息
```

#### 源码中的发布-订阅模式

Vue 就是利用发布-订阅模式来实现视图层和数据层的双向绑定。具体的就不展开了~~

#### 发布-订阅模式的优缺点

发布-订阅模式最大的优点就是**解耦**：

1. **时间上的解耦** ：订阅者不用持续关注，当消息发生时发布者会负责通知；
2. **对象上的解耦** ：发布者不用提前知道消息的接受者是谁，发布者只需要遍历处理所有订阅该消息类型的订阅者发送消息即可

发布-订阅模式也有缺点：

1. **增加消耗** ：创建结构和缓存订阅者这两个过程需要消耗计算和内存资源，即使订阅后始终没有触发，订阅者也会始终存在于内存；
2. **增加复杂度** ：订阅者被缓存在一起，如果多个订阅者和发布者层层嵌套，那么程序将变得难以追踪和调试，参考一下 Vue 调试的时候你点开原型链时看到的那堆 deps/subs/watchers 们…

#### 其他相关模式

1. **观察者模式** 中的观察者和被观察者之间还存在耦合，被观察者还是知道观察者的；
2. **发布-订阅模式** 中的发布者和订阅者不需要知道对方的存在，他们通过**消息代理**来进行通信，解耦更加彻底；

### 代理模式

代理模式又称为委托模式，它为目标对象创造了一个代理对象，以控制目标对象的访问。

代理模式把代理对象插入到**访问者**和**目标对象**之间，从而为访问者对目标对象的访问引入一定的间接性。

正是这种间接性，给了代理对象很多操作空间，比如在**调用目标对象前和调用后**进行一些预操作和后操作，从而实现**新的功能或者扩展目标的功能**。

#### 你曾见过的代理模式

明星总是有个助理，或者说经纪人，如果某导演来请这个明星演出，或者某个品牌来找明星做广告，需要经纪人帮明星做接洽工作。而且经纪人也起到过滤的作用，毕竟明星也不是什么电影和广告都会接。类似的场景还有很多，再比如领导和秘书…

在以上的场景中，有以下特点：

1. 导演对明星的访问都是通过经纪人来完成；
2. 经纪人对访问有过滤的功能；

#### 实例的代码实现

我们使用 JavaScript 来将上面的明星例子实现一下

```js
// 明星
var SuperStar = {
  name: "小鲜肉",
  playAdvertisement: function (ad) {
    console.log(ad);
  },
};

// 经纪人
var ProxyAssistant = {
  name: "经纪人张某",
  playAdvertisement: function (reward, ad) {
    if (reward > 1000000) {
      // 如果报酬超过100w
      console.log("没问题，我们小鲜鲜最喜欢拍广告了！");
      SuperStar.playAdvertisement(ad);
    } else console.log("没空!");
  },
};

ProxyAssistant.playAdvertisement(10000, "纯蒸酸牛奶，味道纯纯，尽享纯蒸"); // 没空!
```

这里我们通过经纪人的方式来和明星取得联系，经纪人会视条件过滤一部分合作请求。

我们可以升级一下，比如如果明星没有档期的话，可以通过经纪人安排档期，当明星有空的时候才让明星来拍广告。

这里通过 `Promise` 的方式来实现档期的安排：

```js
// 明星
var SuperStar = {
  name: "小鲜肉",
  playAdvertisement: function (ad) {
    console.log(ad);
  },
};

// 经纪人
var ProxyAssistant = {
  name: "经纪人张某",
  scheduleTime() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("小鲜鲜有空了");
        resolve();
      }, 2000); // 发现明星有空了
    });
  },
  playAdvertisement: function (reward, ad) {
    if (reward > 1000000) {
      // 如果报酬超过100w
      console.log("没问题，我们小鲜鲜最喜欢拍广告了！");
      ProxyAssistant.scheduleTime() // 安排上了
        .then(() => SuperStar.playAdvertisement(ad));
    } else console.log("没空!");
  },
};

ProxyAssistant.playAdvertisement(10000, "纯蒸酸牛奶，味道纯纯，尽享纯蒸"); // 没空!
ProxyAssistant.playAdvertisement(1000001, "纯蒸酸牛奶，味道纯纯，尽享纯蒸");

// 没问题，我们小鲜鲜最喜欢拍广告了！

// 2秒后
// 小鲜鲜有空了
// 纯蒸酸牛奶，味道纯纯，尽享纯蒸
```

这里就简单实现了经纪人对请求的过滤，对明星档期的安排，实现了一个代理对象的基本功能。

#### 代理模式的概念

1. **Target：** 目标对象，也是被代理对象，是具体业务的实际执行者；
2. **Proxy：** 代理对象，负责引用目标对象，以及对访问的过滤和预处理；
3. **Visitor：**明星的访问者

ES6 原生提供了 `Proxy` 构造函数，这个构造函数让我们可以很方便地创建代理对象：

```js
// 明星
var SuperStar = {
  name: "小鲜肉",
  scheduleFlag: false, // 档期标识位，false-没空（默认值），true-有空
  playAdvertisement: function (ad) {
    console.log(ad);
  },
};

// 经纪人
var ProxyAssistant = {
  name: "经纪人张某",
  scheduleTime(ad) {
    // 代理明星
    const schedule = new Proxy(SuperStar, {
      // 在这里监听 scheduleFlag 值的变化
      set(obj, prop, val) {
        if (prop !== "scheduleFlag") return;
        if (obj.scheduleFlag === false && val === true) {
          // 小鲜肉现在有空了
          obj.scheduleFlag = true;
          obj.playAdvertisement(ad); // 安排上了
        }
      },
    });
    setTimeout(() => {
      console.log("小鲜鲜有空了");
      schedule.scheduleFlag = true; // 明星有空了
    }, 2000);
  },
  playAdvertisement: function (reward, ad) {
    if (reward > 1000000) {
      // 如果报酬超过100w
      console.log("没问题，我们小鲜鲜最喜欢拍广告了！");
      ProxyAssistant.scheduleTime(ad);
    } else console.log("没空!");
  },
};

ProxyAssistant.playAdvertisement(10000, "纯蒸酸牛奶，味道纯纯，尽享纯蒸"); // 没空!
ProxyAssistant.playAdvertisement(1000001, "纯蒸酸牛奶，味道纯纯，尽享纯蒸");

// 没问题，我们小鲜鲜最喜欢拍广告了！

// 2秒后
// 小鲜鲜有空了
// 纯蒸酸牛奶，味道纯纯，尽享纯蒸
```

#### 代理模式在实战中的应用

- 拦截器：拦截器的思想在实战中应用非常多，比如我们在项目中经常使用 `Axios` 的实例来进行 HTTP 的请求，使用拦截器 `interceptor` 可以提前对 `request` 请求和 `response` 返回进行一些预处理
- 前端框架的数据响应式化
- 缓存代理：将复杂计算的结果缓存起来，下次传参一致时直接返回之前缓存的计算结果
- 保护代理：当一个对象可能会收到大量请求时，可以设置保护代理，通过一些条件判断对请求进行过滤
- 虚拟代理：在程序中可以能有一些代价昂贵的操作，此时可以设置虚拟代理。而虚拟代理是为一个开销很大的操作先占位，之后再执行，比如：一个很大的图片加载前，一般使用菊花图、低质量图片等提前占位，优化图片加载导致白屏的情况
- 正向代理： 一般的访问流程是客户端直接向目标服务器发送请求并获取内容，使用正向代理后，客户端改为向代理服务器发送请求，并指定目标服务器（原始服务器），然后由代理服务器和原始服务器通信，转交请求并获得的内容，再返回给客户端。正向代理隐藏了真实的客户端，为客户端收发请求，使真实客户端对服务器不可见；
- 反向代理：与一般访问流程相比，使用反向代理后，直接收到请求的服务器是代理服务器，然后将请求转发给内部网络上真正进行处理的服务器，得到的结果返回给客户端。反向代理隐藏了真实的服务器，为服务器收发请求，使真实服务器对客户端不可见。

#### 代理模式的优缺点

代理模式的主要优点有：

1. 代理对象在访问者与目标对象之间可以起到**中介和保护目标对象**的作用；
2. 代理对象可以**扩展目标对象的功能**；
3. 代理模式能将访问者与目标对象分离，在一定程度上**降低了系统的耦合度**，如果我们希望适度扩展目标对象的一些功能，通过修改代理对象就可以了

代理模式的缺点主要是增加了系统的复杂度，要斟酌当前场景是不是真的需要引入代理模式（**十八线明星就别请经纪人了**）

### 迭代器模式

迭代器模式用于顺序地访问聚合对象内部的元素，又无需知道对象内部结构。

使用了迭代器之后，使用者不需要关心对象的内部构造，就可以按序访问其中的每个元素。

#### 什么是迭代器

银行里的点钞机就是一个迭代器，放入点钞机的钞票里有不同版次的人民币，每张钞票的冠字号也不一样，但当一沓钞票被放入点钞机中，使用者并不关心这些差别，只关心钞票的数量，以及是否有假币。

这里我们使用 JavaScript 的方式来点一下钞：

```js
var bills = [
  "MCK013840031",
  "MCK013840032",
  "MCK013840033",
  "MCK013840034",
  "MCK013840035",
];

bills.forEach(function (bill) {
  console.log("当前钞票的冠字号为 " + bill);
});
```

是不是很简单，这是因为 JavaScript 已经内置了迭代器的实现。

#### js 原生支持

随着 JavaScript 的 ECMAScript 标准每年的发展，给越来越多好用的 API 提供了支持，比如 Array 上的 `filter`、`forEach`、`reduce`、`flat` 等，还有 Map、Set、String 等数据结构，也提供了原生的迭代器支持，给我们的开发提供了很多便利

#### 迭代器模式总结

迭代器模式早已融入我们的日常开发中，在使用 `filter`、`reduce`、`map` 等方法的时候，不要忘记这些便捷的方法就是迭代器模式的应用。当我们使用迭代器方法处理一个对象时，我们可以关注与处理的逻辑，而不必关心对象的内部结构，侧面将对象内部结构和使用者之间解耦，也使得代码中的循环结构变得紧凑而优美。

### 装饰器模式

装饰器模式又称装饰者模式，在不改变原对象的基础上，通过对其添加属性或方法来进行包装拓展，使得原有对象可以动态具有更多功能。

本质是功能**动态组合**，即动态地给一个对象添加额外的职责。

有效地把对象的核心职责和装饰功能区分开，并且通过动态增删装饰去除目标对象中重复的装饰逻辑。

#### 你曾见过的装饰器模式

相信大家都知道房屋装修的过程，当毛坯房建好的时候，已经可以居住了，虽然不太舒适。一般我们自己住当然不会住毛坯，因此我们还会通水电、墙壁刷漆、铺地板、家具安装、电器安装等等步骤，让房屋渐渐具有各种各样的特性，比如墙壁刷漆和铺地板之后房屋变得更加美观，有了家具居住变得更加舒适，但这些额外的装修并没有影响房屋是用来居住的这个基本功能，这就是装饰的作用。

再比如现在我们经常喝的奶茶，除了奶茶之外，还可以添加珍珠、波霸、椰果、仙草、香芋等等辅料，辅料的添加对奶茶的饮用并无影响，奶茶喝起来还是奶茶的味道，只不过辅料的添加让这杯奶茶的口感变得更多样化。

在类似场景中，这些例子有以下特点：

1. 装饰不影响原有的功能，原有功能可以照常使用；
2. 装饰可以增加多个，共同给目标对象添加额外功能；

#### 实例代码的实现

我们可以使用 JavaScript 来将装修房子的例子实现一下：

```js
/* 毛坯房 - 目标对象 */
function OriginHouse() {}

OriginHouse.prototype.getDesc = function () {
  console.log("毛坯房");
};

/* 搬入家具 - 装饰者 */
function Furniture(house) {
  this.house = house;
}

Furniture.prototype.getDesc = function () {
  this.house.getDesc();
  console.log("搬入家具");
};

/* 墙壁刷漆 - 装饰者 */
function Painting(house) {
  this.house = house;
}

Painting.prototype.getDesc = function () {
  this.house.getDesc();
  console.log("墙壁刷漆");
};

var house = new OriginHouse();
house = new Furniture(house);
house = new Painting(house);

house.getDesc();

// 毛坯房;
// 搬入家具;
// 墙壁刷漆;
```

是不是感觉很麻烦，装饰个功能这么复杂？我们 JSer 大可不必走这一套面向对象花里胡哨的，毕竟 JavaScript 的优点就是灵活：

```js
/* 毛坯房 - 目标对象 */
var originHouse = {
  getDesc() {
    console.log("毛坯房 ");
  },
};

/* 搬入家具 - 装饰者 */
function furniture() {
  console.log("搬入家具 ");
}

/* 墙壁刷漆 - 装饰者 */
function painting() {
  console.log("墙壁刷漆 ");
}

/* 添加装饰 - 搬入家具 */
originHouse.getDesc = (function () {
  var getDesc = originHouse.getDesc;
  return function () {
    getDesc();
    furniture();
  };
})();

/* 添加装饰 - 墙壁刷漆 */
originHouse.getDesc = (function () {
  var getDesc = originHouse.getDesc;
  return function () {
    getDesc();
    painting();
  };
})();

originHouse.getDesc();
// 输出： 毛坯房  搬入家具  墙壁刷漆
```

#### 实战中的装饰者模式

给浏览器添加新功能

之前介绍的添加装饰器函数的方式，经常被用来给原有浏览器或 DOM 绑定事件上绑定新的功能，比如在 `onload` 上增加新的事件，或在原来的事件绑定函数上增加新的功能，或者在原本的操作上增加用户行为埋点：

```js
window.onload = function () {
  console.log("原先的 onload 事件 ");
};

/* 发送埋点信息 */
function sendUserOperation() {
  console.log("埋点：用户当前行为路径为 ...");
}

/* 将新的功能添加到 onload 事件上 */
window.onload = (function () {
  var originOnload = window.onload;
  return function () {
    originOnload && originOnload();
    sendUserOperation();
  };
})();

// 输出： 原先的 onload 事件
// 输出： 埋点：用户当前行为路径为 ...
```

#### 装饰者模式的优缺点

装饰者模式的优点：

1. 使用继承的方式来扩展功能，会带来很多的子类和复杂的继承关系，装饰者模式可以在不引起子类数量暴增的前提下动态地修饰对象，添加功能，**装饰者和被装饰者之间松耦合**，可维护性好；
2. 被装饰者可以使用装饰者**动态地增加和撤销功能**，可以在运行时选择不同的装饰器，实现不同的功能，灵活性好；
3. 装饰者模式把一系列复杂的功能分散到每个装饰器当中，一般一个装饰器只实现一个功能，可以给一个对象增加多个同样的装饰器，也可以把一个装饰器用来装饰不同的对象，**有利于装饰器功能的复用**；
4. 可以通过选择不同的装饰者的组合，**创造不同行为和功能的结合体**，原有对象的代码无须改变，就可以使得原有对象的功能变得更强大和更多样化；

装饰者模式的缺点：

1. 使用装饰者模式时会产生很多细粒度的装饰者对象，这些装饰者对象由于接口和功能的多样化导致系统复杂度增加，功能越复杂，需要的细粒度对象越多；
2. 由于更大的灵活性，也就更容易出错，特别是对于多级装饰的场景，错误定位会更加繁琐；

#### 装饰者适用场景

1. 如果不希望系统中增加很多子类，那么可以考虑使用装饰者模式；
2. 需要通过对现有的一组基本功能进行排列组合而产生非常多的功能时，采用继承关系很难实现，这时采用装饰者模式可以很好实现；
3. 当对象的功能要求可以动态地添加，也可以动态地撤销，可以考虑使用装饰者模式；

