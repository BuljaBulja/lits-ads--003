'use strict';

const fs = require('fs'),
  helpers = require('./helpers.js');

let fileName = process.argv[2] || 'lngpok',
  path = __dirname + '/' + fileName;

fs.readFile(path + '.in', 'utf8', (err, data) => {
  let fileData = data.split('\n'),
    pokerCards = fileData[0].split(' ').map(x => parseInt(x, 10)),
    deckData, maxCombo;

  deckData = helpers.countDeckData(pokerCards, 1000000);
  maxCombo = helpers.findCombo(deckData.countedCards, deckData.offset);

  fs.writeFile(path + '.out', maxCombo, 'utf8');
});
