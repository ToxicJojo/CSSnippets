const html2pug = require('html2pug');
const pug = require('pug');

const generatePug = (sectionName) => {
  const html = pug.renderFile('../app/templates/shared/section.pug', {
    sectionName,
  });

  let pugString = html2pug(html);

  // Remove the html head and body tag
  pugString = pugString.replace('html\n  head\n  body\n', '');
  // Remove the whitespace on the first line
  pugString = pugString.replace('    ', '');
  // Remove the whitespace on all other lines
  pugString = pugString.replace(new RegExp('\n    ', 'g'), '\n');
  // Add the templates for the code sections
  pugString = pugString.replace('language-css', `language-css= css.${sectionName}`);
  pugString = pugString.replace('language-scss', `language-scss= scss.${sectionName}`);

  console.log(pugString);
};

const args = process.argv;
const sectionName = args[2];

generatePug(sectionName);
