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
