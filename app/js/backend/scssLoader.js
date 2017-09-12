const util = require('./util');

const scssPath = '/app/sass/snippets/';
const cssPath = '/public/css/intern/';

const loadScss = async (fileName) => {
  const path = `${util.getProjectDir()}${scssPath}${fileName}.scss`;

  const fileContent = await util.readFileAsync(path);

  return fileContent;
};

const loadCss = async (fileName) => {
  const path = `${util.getProjectDir()}${cssPath}${fileName}.css`;

  const fileContent = await util.readFileAsync(path);

  return fileContent;
};

module.exports.loadScss = loadScss;
module.exports.loadCss = loadCss;
