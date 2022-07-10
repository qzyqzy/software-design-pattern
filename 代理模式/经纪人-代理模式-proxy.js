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
