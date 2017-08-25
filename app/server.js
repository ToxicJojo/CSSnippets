const express = require('express');

const app = express();

// Server static content from the public directory
app.use(express.static('public'));
// Set our render engine to be pug.
app.set('views', 'app/templates');
app.set('view engine', 'pug');


app.get('/', (req, res) => {
  res.render('pages/index', { title: 'CSSnippets' });
});


app.get('/buttons', (req, res) => {
  res.render('pages/buttons', { title: 'CSSnippets - Buttons' });
});

app.get('/header', (req, res) => {
  res.render('pages/header', { title: 'CSSnippets - Header' });
});

app.get('/page/buttons', (req, res) => {
  res.render('content/buttons', { title: 'CSSnippets - Buttons' });
});

app.get('/page/header', (req, res) => {
  res.render('content/header', { title: 'CSSnippets - Header' });
});

const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = server;
