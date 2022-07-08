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
ManageGame._schedule = null;
const schedule2 = ManageGame.getInstance();
const schedule3 = new ManageGame();

console.log(schedule1 === schedule2, schedule1 === schedule3); // true
