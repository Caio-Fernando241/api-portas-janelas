const fs = require('fs');
const path = require('path');

module.exports = {
  readData: (file) => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, `../database/${file}.json`)));
  },
  writeData: (file, data) => {
    fs.writeFileSync(
      path.join(__dirname, `../database/${file}.json`),
      JSON.stringify(data, null, 2)
    );
  }
};