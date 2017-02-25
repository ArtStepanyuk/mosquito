'use strict';
// Declare app level module which depends on views, and components
angular.module('app', [
  'ngRoute',
  'btford.socket-io',
  'app.main'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/main'});
}]);
