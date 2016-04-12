var fs = require('fs'),
  fileName = process.argv[2] || 'discnt',
  path = __dirname + '/' + fileName;

// Main function.
fs.readFile(path + '.in', 'utf8', function(err, data) {
  var fileData = data.split('\n'),
    prices = fileData[0].split(' ').map(x => parseInt(x, 10)),
    discount = parseInt(fileData[1], 10),
    discItemsCount = parseInt(prices.length/3),
    totalPrise;

  insertionSort(prices);

  totalPrise = prices.reduce(function(result, item, index) {
    var currPrise = discItemsCount > index ?
      item - (item / 100) * discount : item;

    return result + currPrise
  }, 0);

  fs.writeFile(path + '.out', totalPrise.toFixed(2), 'utf8');
});

// Insertion sort realisation.
function insertionSort(array) {
  var arrayKeys = Object.keys(array);
  
  arrayKeys.shift();
  arrayKeys.forEach(function(idxKey) {
    var currPos = idxKey;

    for (;currPos && revertCompare(array[currPos], array[currPos - 1]);) {
      swap(array, currPos, currPos - 1);
      currPos--;
    }
  });
}

// Used to find if firt value larger than second.
function revertCompare(a, b) {
  return a > b;
}

// Used to swap values in array.
function swap(arr, i, j) {
  var cashedVal = arr[i];

  arr[i] = arr[j];
  arr[j] = cashedVal;
}