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


const server = app.listen(3000, () => {
});

module.exports = server;
