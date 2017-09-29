const fs = require('fs');
const path = require('path');

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

const readDirAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
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

  // This function is used to get the section info inside a pug template.
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

const getPageList = async () => {
  const files = await readDirAsync(basePathConfig);

  const pages = files.map((fileName) => {
    return path.basename(fileName, '.json');
  });

  return pages;
};

const pageExists = async (pageName) => {
  const pageList = await getPageList();

  return pageList.includes(pageName);
};


module.exports.readFileAsync = readFileAsync;
module.exports.writeFileAsync = writeFileAsync;
module.exports.getProjectDir = getProjectDir;
module.exports.getPageConfig = getPageConfig;
module.exports.savePageConfig = savePageConfig;
module.exports.getPageList = getPageList;
module.exports.pageExists = pageExists;
