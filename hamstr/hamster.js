'use strict';

function Hamster(hamsterInfo) {
  this.hunger = hamsterInfo[0];
  this.avarice = hamsterInfo[1];
}

Hamster.prototype.countFoodDemand = function(neighbors) {
  return this.hunger + (neighbors * this.avarice);
}

module.exports = Hamster;
