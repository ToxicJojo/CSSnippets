const buttonsView = require('./../view/buttons');
const scssLoader = require('./../scssLoader');
const util = require('../util');

const pageName = 'buttons';

const getParams = async () => {
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

  return params;
};

const show = async (request, response) => {
  const params = await getParams();

  buttonsView.show(request, response, params);
};

const showContent = async (request, response) => {
  const params = await getParams();

  buttonsView.showContent(request, response, params);
};

module.exports.show = show;
module.exports.showContent = showContent;
