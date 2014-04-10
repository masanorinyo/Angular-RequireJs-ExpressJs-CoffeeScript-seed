(function() {
  (function() {
    define([], function() {
      return function($scope) {
        $scope.hello = 'hello';
        return $scope.$apply();
      };
    });
  }).call(this);

}).call(this);
