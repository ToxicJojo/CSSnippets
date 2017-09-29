const express = require('express');
const util = require('./js/backend/util');
const pageController = require('./js/backend/controller/pageController');

const app = express();

const port = process.env.PORT || 3000;
// Server static content from the public directory
app.use(express.static('public'));
// Set our render engine to be pug.
app.set('views', 'app/templates');
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
  const params = {
    title: 'CSSnippets',
  };
  params.pages = await util.getPageList();

  res.render('pages/index', params);
});

app.get('/:page', pageController.show);

app.get('/:page/content', pageController.showContent);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = server;
