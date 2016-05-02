'use strict';

function Cage(totalFood) {
  this.totalFood = totalFood;
  this.hamsters = [];
}

Cage.prototype.addHamster = function(hamster) {
  this.hamsters.push(hamster);
}

Cage.prototype.countTotalHunger = function() {
  let totalFoodDemand = 0;

  for (let i = 0; i < this.hamsters.length; i++) {
    totalFoodDemand += this.hamsters[i]
      .countFoodDemand(this.hamsters.length - 1);
  }

  return totalFoodDemand;
}

Cage.prototype.leaveHungriestHamster = function() {
  // TODO: replace by own sorting algorithm.
  this.hamsters.sort((a, b) => a.foodDemand - b.foodDemand);
  this.hamsters.pop();
}

module.exports = Cage;
