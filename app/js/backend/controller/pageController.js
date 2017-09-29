const scssLoader = require('./../scssLoader');
const util = require('../util');

const getParams = async (pageName) => {
  const params = {
    css: {},
    scss: {},
  };

  const config = await util.getPageConfig(pageName);

  await Promise.all(config.sections.map(async (section) => {
    params.scss[section.name] = await scssLoader.loadScss(section.name);
    params.css[section.name] = await scssLoader.loadCss(section.name);
  }));

  params.config = config;

  params.pages = await util.getPageList();
  params.activePage = pageName;

  return params;
};

const show = async (request, response, next) => {
  const pageName = request.params.page;
  console.log(pageName);
  if (await util.pageExists(pageName)) {
    const params = await getParams(pageName);
    response.render(`pages/${pageName}`, params);
  } else {
    next();
  }
};

const showContent = async (request, response, next) => {
  const pageName = request.params.page;

  if (await util.pageExists(pageName)) {
    const params = await getParams(pageName);
    response.render(`content/${pageName}`, params);
  } else {
    next();
  }
};

module.exports.show = show;
module.exports.showContent = showContent;
