const show = (request, response, params) => {
  response.render('pages/header', params);
};

const showContent = (request, response, params) => {
  response.render('content/header', params);
};

module.exports.show = show;
module.exports.showContent = showContent;
