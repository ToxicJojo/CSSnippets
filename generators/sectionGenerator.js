const fs = require('fs');
const util = require('../app/js/backend/util');
const prompt = require('prompt');

const basePathPug = 'app/templates/sections/';
const basePathSnippets = 'app/sass/snippets/';

/**
 * Prompts the user to input information that will be used to generate
 * a section.
 * @return {Promise} A Promise that resolves to an object containing the
                     given data.
*/
const getSectionInfo = () => {
  return new Promise((resolve, reject) => {
    prompt.get(['pageName', 'sectionName', 'sectionTitle'], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

/**
 * Adds the given section information to a page config.
 * @param {String} pageName The name of the page of which the config wil be changed
 * @param {String} sectionName The name of the new section.
 * @param {String} sectionTitle The title of the new section.
*/
const addSectionToPageConfig = async (pageName, sectionName, sectionTitle) => {
  const config = await util.getPageConfig(pageName);

  // Create a new object containing the section information and add it to
  // the config.
  const newSection = {
    name: sectionName,
    title: sectionTitle,
  };

  config.sections.push(newSection);

  await util.savePageConfig(pageName, config);
};

/**
 * Generates the .pug file for the section in app/templates/sections/${sectionName}.pug
 * Also modifies the section files for the given page.
 * @param {String} pageName The name of the page in which the new section will
 *                          appear.
 * @param {String} sectionName The name of the new section.
*/
const generatePug = async (pageName, sectionName) => {
  let sectionsPug = await util.readFileAsync(`app/templates/content/${pageName}Sections.pug`);

  // Before including the new section the section variable needs to containing
  // the information for that section.
  sectionsPug += `\n-var section = config.getSectionFromName('${sectionName}')`;
  sectionsPug += `\ninclude ../sections/${sectionName}.pug`;

  await util.writeFileAsync(`app/templates/content/${pageName}Sections.pug`, sectionsPug);

  const blankSection = await util.readFileAsync(`${basePathPug}blankSection.pug`);

  await util.writeFileAsync(`${basePathPug}${sectionName}.pug`, blankSection);
};

/**
 * Generates a new empty .scss file for a section. If the file already exists
 * the file remains unchanged.
 * @param {String} sectionName The name of the section.
*/
const generateScssFile = (sectionName) => {
  fs.openSync(`${basePathSnippets}${sectionName}.scss`, 'a');
};

const generateSection = async () => {
  const info = await getSectionInfo();

  const pageName = info.pageName;
  const sectionName = info.sectionName;
  const sectionTitle = info.sectionTitle;

  addSectionToPageConfig(pageName, sectionName, sectionTitle);
  generatePug(pageName, sectionName);
  generateScssFile(sectionName);
};

generateSection();
