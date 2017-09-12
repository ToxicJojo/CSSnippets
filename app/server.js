const express = require('express');
const buttonsRouter = require('./js/backend/router/buttons');
const headerRouter = require('./js/backend/router/header');

const app = express();

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

const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = server;
