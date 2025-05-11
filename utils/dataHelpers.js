const fs = require('fs');
const path = require('path');

module.exports = {
  readData: (file) => {
    const rawData = fs.readFileSync(path.join(__dirname, `../database/${file}.json`));
    return JSON.parse(rawData);
  },
  writeData: (file, data) => {
    fs.writeFileSync(
      path.join(__dirname, `../database/${file}.json`),
      JSON.stringify(data, null, 2)
    );
  }
};