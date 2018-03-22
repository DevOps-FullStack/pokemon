'use strict';
angular.module('appAlgar').factory('PokemonApiService', [
  '$resource',
  function($resource) {
    var cache = {};

    var pokemonApi = $resource('https://pokeapi.co/api/v1/:verb/:id', {
      verb: '@pokedex',
      id: '@id',
      limit: '@limit',
      offset: '@offset'
    });   

    return { pokemonApi: pokemonApi, cache: cache };
  }
]);
