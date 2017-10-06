const scssLoader = require('./../scssLoader');
const util = require('../util');

const colors = ['red', 'blue', 'orange', 'purple', 'teal'];
/**
 * Loads the parameter for a page to be displayed.
 * @param {String} pageName The name of the page the parameter will be loaded for.
*/
const getParams = async (pageName) => {
  const params = {
    css: {},
    scss: {},
  };

  const config = await util.getPageConfig(pageName);
  // Load the css and scss files for the sections.
  await Promise.all(config.sections.map(async (section) => {
    params.scss[section.name] = await scssLoader.loadScss(section.name);
    params.css[section.name] = await scssLoader.loadCss(section.name);
  }));

  params.config = config;

  params.colors = colors;

  params.pages = await util.getPageList();
  params.activePage = pageName;

  return params;
};


const showPageOrContent = async (type, request, response, next) => {
  const pageName = request.params.page;

  // Check if the requested page exists.
  if (await util.pageExists(pageName)) {
    const params = await getParams(pageName);
    response.render(`${type}/${pageName}`, params);
  } else {
    next();
  }
};

const show = async (request, response, next) => {
  showPageOrContent('pages', request, response, next);
};

const showContent = async (request, response, next) => {
  showPageOrContent('content', request, response, next);
};

module.exports.show = show;
module.exports.showContent = showContent;
