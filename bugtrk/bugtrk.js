'use strict';

const fs = require('fs');

let fileName = process.argv[2] || 'bugtrk',
  path = __dirname + '/' + fileName;

fs.readFile(path + '.in', 'utf8', (err, data) => {
  let fileData = data.split('\n'),
    splitedData = fileData[0].split(' '),
    cardsCount = splitedData[0],
    longSide, shortSide, result;

  if (splitedData[1] > splitedData[2]) {
    longSide = splitedData[1];
    shortSide = splitedData[2];
  } else {
    longSide = splitedData[2];
    shortSide = splitedData[1];
  }

  result = getMinSquare(longSide, shortSide, cardsCount);

  fs.writeFile(path + '.out', result, 'utf8');
});


function getMinSquare(longSide, shortSide, count) {
  let squareSide, right, left, middle, currCount;

  if (longSide === shortSide) {
    squareSide = Math.ceil(Math.sqrt(count)) * longSide;
  } else {
    right = longSide * count;
    left = 1;

    while (left < right) {
      middle = Math.floor((left + right) / 2);
      currCount = Math.floor(middle / longSide) *
          Math.floor(middle / shortSide);

      if (currCount < count) {
        left = middle + 1;
      } else {
        right = middle;
      }
    }

    squareSide = right < left ? middle : left;
  }

  return squareSide;
}


