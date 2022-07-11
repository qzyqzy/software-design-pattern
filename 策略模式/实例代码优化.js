const DiscountMap = {
  minus100_30: function (price) {
    return price - Math.floor(price / 100) * 30;
  },
  minus200_80: function (price) {
    return price - Math.floor(price / 200) * 80;
  },
  percent80: function (price) {
    return price * 0.8;
  },
};

/* 计算总售价*/
function priceCalculate(discountType, price) {
  return DiscountMap[discountType] && DiscountMap[discountType](price);
}

priceCalculate("minus100_30", 270);
priceCalculate("percent80", 250);

// 输出: 210
// 输出: 200
