const fs = require('fs');

const readFileAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getProjectDir = () => {
  return process.env.PWD;
};

module.exports.readFileAsync = readFileAsync;
module.exports.getProjectDir = getProjectDir;
