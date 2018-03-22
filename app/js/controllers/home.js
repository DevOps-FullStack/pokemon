'use strict';

angular.module('appAlgar').controller('HomeController',  [
  '$scope',
  'TimesService',
  function($scope, TimesService) {
    var self = this;

    self.times = TimesService.times;    
  }
]);
