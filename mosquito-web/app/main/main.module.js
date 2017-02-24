// ToDo: change to ui router
angular.module('app.main', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'main/main.html'
        });
    }]);