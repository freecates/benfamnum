const sitemap = require('nextjs-sitemap-generator');

sitemap({
  baseUrl: 'https://beneficiosfamiliasnumerosas.org',
  ignoredPaths: ['admin'],
  pagesDirectory: 'pages',
  targetDirectory: 'static/'
});
