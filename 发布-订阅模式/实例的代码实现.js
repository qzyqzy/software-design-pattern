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
