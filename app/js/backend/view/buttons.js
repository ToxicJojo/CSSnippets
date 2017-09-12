const show = (request, response, params) => {
  response.render('pages/buttons', params);
};

const showContent = (request, response, params) => {
  response.render('content/buttons', params);
};

module.exports.show = show;
module.exports.showContent = showContent;
