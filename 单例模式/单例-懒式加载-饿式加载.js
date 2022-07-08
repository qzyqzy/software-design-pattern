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
