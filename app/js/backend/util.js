const fs = require('fs');

const basePathConfig = 'app/config/pages/';

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

const writeFileAsync = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const getProjectDir = () => {
  return process.env.PWD;
};

const getPageConfig = async (pageName) => {
  const path = `${basePathConfig}${pageName}.json`;
  const configText = await readFileAsync(path);

  const config = JSON.parse(configText);

  config.getSectionFromName = (sectionName) => {
    let result;

    config.sections.forEach((section) => {
      if (section.name === sectionName) {
        result = section;
      }
    });

    return result;
  };

  return config;
};

const savePageConfig = async (pageName, config) => {
  const configText = JSON.stringify(config);

  await writeFileAsync(`${basePathConfig}${pageName}.json`, configText);
};

module.exports.readFileAsync = readFileAsync;
module.exports.writeFileAsync = writeFileAsync;
module.exports.getProjectDir = getProjectDir;
module.exports.getPageConfig = getPageConfig;
module.exports.savePageConfig = savePageConfig;
