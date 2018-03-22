'use strict';

angular.module('appAlgar').directive('badge', function() {
  var ddo = {};
  ddo.restrict = 'E';
  ddo.scope = {
    nome: '=',
    excluir: '&',
    acao: '&'
  };
  ddo.templateUrl = 'js/directives/badge/badge.html';

  return ddo;
});
