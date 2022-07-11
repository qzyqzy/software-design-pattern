function priceCalculate(discountType, price) {
  if (discountType === "minus100_30") {
    // 满100减30
    return price - Math.floor(price / 100) * 30;
  } else if (discountType === "minus200_80") {
    // 满200减80
    return price - Math.floor(price / 200) * 80;
  } else if (discountType === "percent80") {
    // 8折
    return price * 0.8;
  }
}

priceCalculate("minus100_30", 270); // 输出: 210
priceCalculate("percent80", 250); // 输出: 200
