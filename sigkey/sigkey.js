'use strict';

const fs = require('fs');

let fileName = process.argv[2] || 'sigkey',
  path = __dirname + '/' + fileName;

fs.readFile(path + '.in', 'utf8', (err, data) => {
  let fileData = data.split('\n'),
    firstChar = 97,
    charsCount = 26,
    result = 0,
    charsMap = [],
    keys = [];

  for (var i = 97; i < 97 + 26; i++) {
    charsMap.push(String.fromCharCode(i));
  }

  for (let i = 1; i < fileData.length - 1; i++) {
    keys.push(fileData[i].split('').sort().join(''));
  }

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i],
      neededString = '';

    for(let j = 0; j <= charsMap.indexOf(key[key.length - 1]); j++) {
      if (key.indexOf(charsMap[j]) === -1) {
        neededString += charsMap[j];
      }
    }

    if (keys.indexOf(neededString) !== -1) {
      result++;
    }
  }

  fs.writeFile(path + '.out', result, 'utf8');
});
