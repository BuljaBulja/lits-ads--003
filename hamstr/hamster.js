'use strict';

function Hamster(hamsterInfo) {
  this.hunger = hamsterInfo[0];
  this.avarice = hamsterInfo[1];
  this.foodDemand = 0;
}

Hamster.prototype.countFoodDemand = function(neighbors) {
  this.foodDemand = this.hunger + (neighbors * this.avarice);

  return this.foodDemand;
}

module.exports = Hamster;
