Package.describe({
  name: 'medbook:patient-id',
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

  api.addFiles('components/Patient_ID/Patient_ID.html', 'client');
  api.addFiles('components/Patient_ID/Patient_ID.js', 'client');

  api.addFiles('components/Sample_ID/Sample_ID.html', 'client');
  api.addFiles('components/Sample_ID/Sample_ID.js', 'client');

  api.addFiles('client.js', 'client');
  api.addFiles('server.js', 'server');

  api.export('Patient_ID');
  api.export('Sample_ID');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('medbook:patient-id');
  api.addFiles('patient-id-tests.js');
});
