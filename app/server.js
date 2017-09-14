const express = require('express');
const buttonsRouter = require('./js/backend/router/buttons');
const headerRouter = require('./js/backend/router/header');

const app = express();

const port = process.env.PORT || 3000;
// Server static content from the public directory
app.use(express.static('public'));
// Set our render engine to be pug.
app.set('views', 'app/templates');
app.set('view engine', 'pug');


app.get('/', (req, res) => {
  res.render('pages/index', { title: 'CSSnippets' });
});


app.use('/buttons', buttonsRouter);

app.use('/header', headerRouter);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = server;
