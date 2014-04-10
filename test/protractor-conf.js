exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*Spec.js'
  ],

  capabilities: {
    'browserName': 'ChromeCanary'
  },

  baseUrl: 'http://localhost:3000',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
