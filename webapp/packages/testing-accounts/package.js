Package.describe({
  summary: "Adds Medbook test users.",
  // update this value before you run 'meteor publish'
  version: "1.0.4",

  // if this value isn't set, meteor will default to the directory name
  name: "medbook:testing-accounts",

  // and add this value if you want people to access your code from Atmosphere
  //git: "http://github.com/awatson1978/accounts-housemd.git",

  isDebug: true
});

Package.on_use(function (api) {
  api.use('accounts-base@1.1.3');
  api.use('accounts-password@1.0.5');

  api.add_files('initialize.users.js', 'server');
  api.add_files('initialize.users.housemd.js', 'server');

});
