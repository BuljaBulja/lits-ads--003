'use strict';

const fs = require('fs'),
  Hamster = require('./hamster.js'),
  Cage = require('./cage.js');

let fileName = process.argv[2] || 'hamstr',
  path = __dirname + '/' + fileName;

fs.readFile(path + '.in', 'utf8', (err, data) => {
  const fileData = data.split('\n'),
    cage = new Cage(parseInt(fileData[0], 10));

  for (let i = 2; i < fileData.length - 1; i++) {
    let hamsterInfo = fileData[i].split(' ').map(x => parseInt(x, 10));

    cage.addHamster(new Hamster(hamsterInfo));

    if (cage.availableFood < cage.countTotalHunger()) {
      cage.leaveHungriestHamster();
    }
  }

  fs.writeFile(path + '.out', cage.hamsters.length, 'utf8');
});
