var AngularjsApp = angular.module('AngularjsApp', ['ngRoute']);

AngularjsApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller:'MapGenerator',
            templateUrl:'views/home.html'
        })
        // Default
        .otherwise({
            redirectTo:'/'
        });
});