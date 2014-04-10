(->
  define [], ->
    ($scope) ->
      $scope.hello = 'hello'
      $scope.$apply()

  return
).call this