const buttonsView = require('./../view/buttons');
const scssLoader = require('./../scssLoader');

const getParams = async () => {
  const params = {
    css: {},
    scss: {},
  };

  params.scss.roundButton = await scssLoader.loadScss('roundButton');
  params.css.roundButton = await scssLoader.loadCss('roundButton');

  params.scss.flatButton = await scssLoader.loadScss('flatButton');
  params.css.flatButton = await scssLoader.loadCss('flatButton');

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
