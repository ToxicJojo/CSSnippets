const fs = require('fs');
const prompt = require('prompt');
const util = require('../app/js/backend/util');

const basePathConfig = 'app/config/pages/';
const basePathPug = 'app/templates';

const getPageInfo = () => {
  return new Promise((resolve, reject) => {
    prompt.get(['pageName'], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const generatePug = async (pageName) => {
  let pagePug = await util.readFileAsync(`${basePathPug}/pages/blankPage.pug`);

  pagePug = pagePug.toString().replace('pageName', pageName);
  await util.writeFileAsync(`${basePathPug}/pages/${pageName}.pug`, pagePug);

  let contentPug = await util.readFileAsync(`${basePathPug}/content/blankContent.pug`);

  contentPug = contentPug.toString().replace('pageName', pageName);
  await util.writeFileAsync(`${basePathPug}/content/${pageName}.pug`, contentPug);

  fs.openSync(`${basePathPug}/content/${pageName}Sections.pug`, 'a');
};

const generateConfigFile = async (pageName) => {
  const config = {
    sections: [],
  };

  await util.savePageConfig(pageName, config);
};

const generatePage = async () => {
  const info = await getPageInfo();

  const pageName = info.pageName;

  generateConfigFile(pageName);
  generatePug(pageName);
};

generatePage();
