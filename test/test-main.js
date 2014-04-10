var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    console.log(file);
    allTestFiles.push(file);
    
  }
});

require.config({
  
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/app/public/js',

  paths:{
    'angular'     : '/base/app/public/vendors/angular/angular',
    'angularMocks': '/base/app/public/vendors/angular-mocks/angular-mocks',
    'domReady'    : '/base/app/public/vendors/requirejs-domready/domready',
    'angularRoute': '/base/app/public/vendors/angular-route/angular-route'
  },

  shim: {
    'angular' :{'exports':'angular'},
    'angularRoute' :['angular'],
    'angularMocks':{
      deps: ['angular'],
      'exports':'angular.mock'
    }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
