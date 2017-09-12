const headerView = require('./../view/header');

const show = (request, response) => {
  const params = {};

  headerView.show(request, response, params);
};

const showContent = (request, response) => {
  const param = {};

  headerView.showContent(request, response, param);
};

module.exports.show = show;
module.exports.showContent = showContent;
