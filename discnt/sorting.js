'use strict';

module.exports = {
  selectionSort: selectionSort,
  insertionSort: insertionSort,
  bubbleSort: bubbleSort
}


function selectionSort(array, compareFunc) {
  let minMaxIdx;

  for (let i = 0; i < array.length - 1; i++) {
    minMaxIdx = i;

    for (let j = i + 1; j < array.length; j++) {
      if (compare(array[j], array[minMaxIdx])) {
        minMaxIdx = j;
      }
    }

    swap(array, i, minMaxIdx);
  }
}

function insertionSort(array, compareFunc) {
  let i = 1,
    currPos;

  for (;i < array.length; i++) {
    currPos = i;

    for (;currPos && compareFunc(array[currPos], array[currPos - 1]);) {
      swap(array, currPos, currPos - 1);
      currPos--;
    }
  }
}

function bubbleSort(array, compareFunc) {
  let isSorted = false;

  while (!isSorted) {
    isSorted = true;

    for (let i = 1; i < array.length; i++) {
      if (compareFunc(array[i], array[i - 1])) {
        swap(array, i, i - 1);

        isSorted = false;
      }
    }
  }
}

function swap(arr, i, j) {
  let cashedVal = arr[i];

  arr[i] = arr[j];
  arr[j] = cashedVal;
}
