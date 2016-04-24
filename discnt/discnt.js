'use strict';

const fs = require('fs'),
  sorting = require('./sorting.js');

let fileName = process.argv[2] || 'discnt',
  path = __dirname + '/' + fileName;

fs.readFile(path + '.in', 'utf8', (err, data) => {
  let fileData = data.split('\n'),
    prices = fileData[0].split(' ').map(x => parseInt(x, 10)),
    discount = parseInt(fileData[1], 10),
    discItemsCount = parseInt(prices.length/3),
    totalPrise;

  sorting.mergeSort(prices, (a, b) => a > b);

  totalPrise = prices.reduce((result, item, index) => {
    let currPrise = discItemsCount > index ?
      item - (item / 100) * discount : item;

    return result + currPrise
  }, 0);

  fs.writeFile(path + '.out', totalPrise.toFixed(2), 'utf8');
});
