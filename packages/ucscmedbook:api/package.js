Package.describe({
  name: 'ucscmedbook:api',
  summary: ' MedBook API ',
  version: '0.0.2',
  git: 'https://github.com/ucsc-medbook/medbook-api.git'
});

Package.onUse(function(api) {
  api.use( 'templating', 'client');
  api.use(['session', 'handlebars', 'stylus', 'accounts-base', 'underscore'], 'client');
  api.use('http', ['client', 'server'])
  api.addFiles('api.js', ['client', 'server']);
  api.addFiles(['navigator.css', 'navigator.js', 'navigator.html'], 'client');
  api.export(["MedBookPost", "ApiState", "MedBookNavigator"]);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ucscmedbook:api');
  api.addFiles('api-tests.js');
});
