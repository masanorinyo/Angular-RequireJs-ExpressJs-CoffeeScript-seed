(->
  define [
    'angular'
    'controllers'
  ], (angular, controllers) ->
    angular.module 'myapp', [
      'ngRoute'
      'myapp.controllers'
    ]

  return
).call this