(function() {
  require.config({
    paths: {
      "angular": "../vendors/angular/angular",
      "angularMocks": "../vendors/angular-mock/angular-mock",
      "domReady": "../vendors/requirejs-domready/domready",
      "angularRoute": "../vendors/angular-route/angular-route"
    },
    shim: {
      "angular": {
        'exports': 'angular'
      },
      "angularRoute": {
        deps: ['angular']
      },
      "angularMocks": {
        deps: ['angular'],
        'exports': 'angular.mock'
      }
    }
  });

  require(['angular', 'app', 'routes', 'domReady', 'angularRoute'], function(angular, app, routes, domReady) {
    return domReady(function() {
      return angular.bootstrap(document, ['myapp']);
    });
  });

}).call(this);
