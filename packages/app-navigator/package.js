Package.describe({
  name: 'medbook:app-navigator',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('meteor-platform');
  api.use('less');
  api.use('iron:router');

  api.addFiles('components/appNavigator/appNavigator.html', 'client');
  api.addFiles('components/appNavigator/appNavigator.js', 'client');
  api.addFiles('components/appNavigator/appNavigator.less', 'client');

  api.export('appNavigator');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('app-navigator');
  api.addFiles('app-navigator-tests.js');
});
