module.exports = () => {
  const swPrecache = require('sw-precache');
  const rootDir = 'public';

  swPrecache.write(`${rootDir}/service-worker.js`, {
    verbose: 'true',
    handleFetch: 'false',
    staticFileGlobs: [`${rootDir}/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}`],
    stripPrefix: rootDir,
    dynamicUrlToDependencies: {
      '/buttons': ['app/templates/application.pug', 'app/templates/content/buttons.pug'],
      '/header': ['app/templates/application.pug', 'app/templates/pages/header.pug'],
      '/': ['app/templates/application.pug', 'app/templates/pages/index.pug'],
    },
    runtimeCaching: [{
      urlPattern: /\/*\/content/,
      handler: 'fastest',
      options: {
        cache: {
          maxEntries: 10,
          name: 'page-content-cache',
        },
      },
    }],
  });
};
