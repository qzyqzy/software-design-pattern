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
