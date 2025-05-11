const fs = require('fs');
const path = require('path');

const readData = (file) => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, `../database/${file}.json`)));
};

const writeData = (file, data) => {
  fs.writeFileSync(
    path.join(__dirname, `../database/${file}.json`),
    JSON.stringify(data, null, 2)
  );
};

module.exports = { readData, writeData };