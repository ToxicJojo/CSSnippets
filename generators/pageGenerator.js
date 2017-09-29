const fs = require('fs');
const prompt = require('prompt');
const util = require('../app/js/backend/util');

const basePathPug = 'app/templates';

/**
 * Prompts the user to input information that will be used to generate
 * a page.
 * @return {Promise} A Promise that resolves to an object containing the given data.
*/
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

/**
 * Generates the .pug files for the new page. Three files will be created
 * - pages/pageName.pug The basic layout file
 * - content/pageName.pug The page content
 * - content/pageNameSections.pug The file containing all the section info.
 * @param {String} pageName The name of the new page.
*/
const generatePug = async (pageName) => {
  let pagePug = await util.readFileAsync(`${basePathPug}/pages/blankPage.pug`);

  pagePug = pagePug.toString().replace('pageName', pageName);
  await util.writeFileAsync(`${basePathPug}/pages/${pageName}.pug`, pagePug);

  let contentPug = await util.readFileAsync(`${basePathPug}/content/blankContent.pug`);

  contentPug = contentPug.toString().replace('pageName', pageName);
  await util.writeFileAsync(`${basePathPug}/content/${pageName}.pug`, contentPug);

  fs.openSync(`${basePathPug}/content/${pageName}Sections.pug`, 'a');
};

/**
 * Generates a config file for the new page. The config file wil contain an
 * empty sections array.
 * @param {String} pageName The of the new page.
*/
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
