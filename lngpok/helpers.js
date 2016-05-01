'use strict';

module.exports = {
  countingSort: countingSort,
  countDeckData: countDeckData,
  findCombo: findCombo,
  findComboRec: findComboRec
}

function countingSort(array, min) {
  const offset = min;

  let countArray = [],
    newArrCouter = 0;

  for (let i = 0; i < array.length; i++) {
    if (!countArray[array[i] - offset]) {
      countArray[array[i] - offset] = 1;
    } else {
      countArray[array[i] - offset]++;
    }
  }

  for (let i = 0; i < countArray.length; i++) {
    while (countArray[i]--) {
      array[newArrCouter] = i + offset; 
      newArrCouter++;
    }
  }

  return countArray;
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

function findComboRec(deck) {
  return findRecursive(deck, 1);

  // Maximum call stack size exceeded in 13-15 testcases.
  function findRecursive(deck, startIndex) {
    let jokers = deck[0] || 0,
      cashedJokers = jokers,
      count = 0,
      maxCount = 0;

    for (let i = startIndex; i < deck.length + cashedJokers; i++) {
      if (deck[i]) {
        count++;
      } else if (jokers) {
        jokers--;
        count++;
      } else {
        break;
      }
    }

    if (startIndex < deck.length) {
      maxCount = findRecursive(deck, startIndex + 1);
    }

    return maxCount > count ? maxCount : count;
  }
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