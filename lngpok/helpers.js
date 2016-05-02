'use strict';

module.exports = {
  countDeckData: countDeckData,
  findCombo: findCombo
}

function countDeckData(array, max) {
  let countArray = [],
    offset = max,
    offsetChanged;

  for (let i = 0; i < array.length; i++) {
    if (array[i] && array[i] < offset) {
      offsetChanged = true;
      offset = array[i];
    }

    if (!countArray[array[i]]) {
      countArray[array[i]] = 1;
    } else {
      countArray[array[i]]++;
    }
  }

  return {
    countedCards: countArray,
    offset: offsetChanged ? offset : 1
  };
}

function findCombo(deck, offset) {
  const cashedJokers = deck[0] || 0;

  let maxCount = 0;

  for (let i = offset; i <= deck.length; i++) { 
    let jokers = cashedJokers,
      count = 0;

    if (deck[i] || deck.length === 1) {
      for (let j = i; j < deck.length + cashedJokers; j++) {

        if (deck[j]) {
          count++;
        } else if (jokers) {
          jokers--;
          count++;
        } else {
          break;
        }
      }

      maxCount = maxCount > count ? maxCount : count;
    }
  }

  return maxCount;
}