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
