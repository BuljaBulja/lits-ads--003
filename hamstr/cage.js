'use strict';

function Cage(availableFood) {
  this.availableFood = availableFood;
  this.hamsters = [];
  this.totalHunger = 0;
  this.totalAvarice = 0;
}

Cage.prototype.addHamster = function(hamster) {
  this.hamsters.push(hamster);
  this.totalHunger += hamster.hunger;
  this.totalAvarice += hamster.avarice;
}

Cage.prototype.countTotalHunger = function() {
  return ((this.hamsters.length - 1) * this.totalAvarice) + this.totalHunger;
}

Cage.prototype.leaveHungriestHamster = function() {
  let hungriestHamster = 0,
    currentHamster, hungriestHamsterId, removedHamster;

  for (let i = 0; i < this.hamsters.length; i++) {
    currentHamster = this.hamsters[i].countFoodDemand(this.hamsters.length - 1);

    if (hungriestHamster < currentHamster) {
      hungriestHamster = currentHamster;
      hungriestHamsterId = i;
    }
  }

  swap(this.hamsters, hungriestHamsterId, this.hamsters.length - 1);
  removedHamster = this.hamsters.pop();

  this.totalHunger -= removedHamster.hunger;
  this.totalAvarice -= removedHamster.avarice;

  function swap(arr, i, j) {
    let cashedVal = arr[i];

    arr[i] = arr[j];
    arr[j] = cashedVal;
  }
}

module.exports = Cage;
