'use strict';

angular.module('appAlgar', ['ngRoute', 'ngResource']).config([
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'HomeController as ctrl'
      })
      .when('/times', {
        templateUrl: 'views/times.html',
        controller: 'TimesController as ctrl'
      })
      .when('/times/:id', {
        templateUrl: 'views/times.html',
        controller: 'TimesController as ctrl'
      })
      .otherwise({ redirectTo: '/' });
  }
]);
