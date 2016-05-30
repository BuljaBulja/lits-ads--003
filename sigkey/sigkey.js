'use strict';

const fs = require('fs');

let fileName = process.argv[2] || 'sigkey',
  path = __dirname + '/' + fileName;

fs.readFile(path + '.in', 'utf8', (err, data) => {
  let fileData = data.split('\n'),
    keysCount = fileData[0],
    firstChar = 97,
    charsCount = 26,
    result = 0,
    charsMap = [],
    keysMap = {},
    keysArr;

  for (var i = 97; i < 97 + 26; i++) {
    charsMap.push(String.fromCharCode(i));
  }

  for (let i = 1; i < fileData.length - 1; i++) {
    keysMap[fileData[i].split('').sort().join('')] = true;
  }

  keysArr = Object.keys(keysMap);

  for (let i = 0; i < keysCount; i++) {
    let key = keysArr[i],
      neededString = '';

    for(let j = 0; j <= charsMap.indexOf(key[key.length - 1]); j++) {
      if (key.indexOf(charsMap[j]) === -1) {
        neededString += charsMap[j];
      }
    }

    if (keysMap[neededString]) {
      result++;
    }
  }

  fs.writeFile(path + '.out', result, 'utf8');
});
