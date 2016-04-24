'use strict';

module.exports = {
  selectionSort: selectionSort,
  insertionSort: insertionSort,
  bubbleSort: bubbleSort,
  mergeSort: mergeSort,
  quickSort: quickSort
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

function mergeSort(array, compareFunc) {
  sortRecursive(array, 0, array.length - 1).forEach((value, index) => {
    array[index] = value;
  });

  function sortRecursive(array, left, right) {
    let mergedArr, middle, leftArr, rightArr;

    if (left < right) {
      middle = Math.floor((left + right) / 2);

      leftArr = sortRecursive(array, left, middle);
      rightArr = sortRecursive(array, middle + 1, right);

      mergedArr = merge(leftArr, rightArr);
    } else {
      mergedArr = [array[left]];
    }

    return mergedArr;
  }

  function merge(leftArr, rightArr) {
    let resultArr = new Array(leftArr.length + rightArr.length),
      leftPos, rightPos, resultPos;

    leftPos = rightPos = resultPos = 0;

    while (leftPos < leftArr.length && rightPos < rightArr.length) {
      if (compareFunc(leftArr[leftPos], rightArr[rightPos])) {
        resultArr[resultPos] = leftArr[leftPos];
        leftPos++;
      } else {
        resultArr[resultPos] = rightArr[rightPos];
        rightPos++;
      }

      resultPos++;
    }

    while (leftPos < leftArr.length) {
      resultArr[resultPos] = leftArr[leftPos];
      leftPos++;
      resultPos++;
    }

    while (rightPos < rightArr.length) {
      resultArr[resultPos] = rightArr[rightPos];
      rightPos++;
      resultPos++;
    }

    return resultArr;
  }
}

function quickSort(array, compareFunc) {
  sortRecursive(array, 0, array.length - 1);

  function sortRecursive(array, left, right) {
    let pivot = getPivot(array, left, right),
      leftPos = left,
      rightPos = right;

    while (leftPos <= rightPos) {
      while (compareFunc(array[leftPos], pivot)) {
        leftPos++;
      }

      while (compareFunc(pivot, array[rightPos])) {
        rightPos--;
      }

      if (leftPos <= rightPos) {
        swap(array, leftPos, rightPos);
        leftPos++;
        rightPos--;
      }
    }

    if (left < leftPos - 1) {
      sortRecursive(array, left, leftPos - 1)
    }

    if (leftPos < right) {
      sortRecursive(array, leftPos, right);
    }
  }

  function getPivot(array, left, right) {
    return array[left];
  }
}

function swap(arr, i, j) {
  let cashedVal = arr[i];

  arr[i] = arr[j];
  arr[j] = cashedVal;
}
