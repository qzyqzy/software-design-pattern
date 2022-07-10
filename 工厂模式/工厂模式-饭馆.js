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
