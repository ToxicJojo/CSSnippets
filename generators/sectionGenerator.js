const html2pug = require('html2pug');
const pug = require('pug');
const fs = require('fs');
const util = require('../app/js/backend/util');
const prompt = require('prompt');

const basePathPug = 'app/templates/sections/';
const basePathSnippets = 'app/sass/snippets/';


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

const generatePug = async (pageName, sectionName) => {
  let sectionsPug = await util.readFileAsync(`app/templates/content/${pageName}Sections.pug`);

  sectionsPug += `\n-var section = config.getSectionFromName('${sectionName}')`;
  sectionsPug += `\ninclude ../sections/${sectionName}.pug`;

  await util.writeFileAsync(`app/templates/content/${pageName}Sections.pug`, sectionsPug);

  const blankSection = await util.readFileAsync(`${basePathPug}blankSection.pug`);

  await util.writeFileAsync(`${basePathPug}${sectionName}.pug`, blankSection);
};

const generateScssFile = (sectionName) => {
  fs.openSync(`${basePathSnippets}${sectionName}.scss`, 'a');
};

const addSectionToPageConfig = async (pageName, sectionName, sectionTitle) => {
  const config = await util.getPageConfig(pageName);

  const newSection = {
    name: sectionName,
    title: sectionTitle,
  };

  config.sections.push(newSection);

  await util.savePageConfig(pageName, config);
};

const generateSection = async () => {
  const info = await getSectionInfo();

  const pageName = info.pageName;
  const sectionName = info.sectionName;
  const sectionTitle = info.sectionTitle;

  generatePug(pageName, sectionName);
  generateScssFile(sectionName);
  addSectionToPageConfig(pageName, sectionName, sectionTitle);
};

generateSection();
