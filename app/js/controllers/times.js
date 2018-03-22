'use strict';
angular.module('appAlgar').controller('TimesController', [
  '$scope',
  '$routeParams',
  '$location',
  'TimesService',
  'PokemonApiService',
  function($scope, $routeParams, $location, TimesService, PokemonApiService) {
    var self = this;
    var timeId = parseInt($routeParams.id);

    self.time = {};
    self.pokemons = [];
    self.search = { name: '' };
    self.searchSkill = { name: '' };
    self.disabledAll = false;
    self.disabledAllSkill = false;
    self.habilidades = [];
    self.paginacao = { search: {}, now: {} };
    self.pokemon = null;

    if (PokemonApiService.cache.pokemons === undefined) {
      PokemonApiService.pokemonApi
        .get({ verb: 'pokedex', id: 1 })
        .$promise.then(function(result) {
          PokemonApiService.cache.pokemons = result;
          self.pokemons = PokemonApiService.cache.pokemons.pokemon;
        });
    } else {
      self.pokemons = PokemonApiService.cache.pokemons.pokemon;
    }

    if (PokemonApiService.cache.skill === undefined) {
      PokemonApiService.pokemonApi
        .get({ verb: 'move', limit: 10, offset: 0 })
        .$promise.then(function(response) {
          PokemonApiService.pokemonApi
            .get({
              verb: 'move',
              limit: response.meta['total_count'],
              offset: 0
            })
            .$promise.then(function(result) {
              PokemonApiService.cache.skill = result;
              self.habilidades = PokemonApiService.cache.skill.objects;
            });
        });
    } else {
      self.habilidades = PokemonApiService.cache.skill.objects;
    }

    //Disabilita os botões de adicionar pokemons quando existe mais de cinco
    var isDesableAll = function() {
      if (self.time.pokemons) self.disabledAll = self.time.pokemons.length > 5;
    };

    //Desabilida os botões de adicionar Habilidade/Skills quando o pokemon selecionado já possui 4
    self.isDesableAllSkill = function() {
      if (self.pokemon.habilidades)
        self.disabledAllSkill = self.pokemon.habilidades.length > 3;
      else self.disabledAllSkill = false;
    };
  
    // Verifica se é para editar
    if (timeId) {
      var time = TimesService.times.find(function(ele) {
        return ele.id === timeId;
      });

      self.time = {
        id: time.id,
        name: time.name,
        pokemons: time.pokemons
      };

      isDesableAll();
    }

    // Salva as alterações
    self.salvar = function() {
      if ($scope.form.$invalid) return;

      if (self.time.id) {
        TimesService.times.find(function(time) {
          if (time.id === self.time.id) {
            time = {
              id: self.time.id,
              name: self.time.name,
              pokemons: self.time.pokemons
            };

            self.time = {};
          }
          return time.id === self.time.id;
        });
      } else {
        TimesService.times.push({
          id: TimesService.times.length + 1,
          name: self.time.name,
          pokemons: self.time.pokemons
        });
      }

      $location.path('/');
    };

    // Adiciona um pokemon
    self.addPokemon = function(pokemon) {
      if (!self.time.pokemons) {
        self.time.pokemons = [];
      }

      self.time.pokemons.find(function(ele) {
        return ele.name === pokemon.name;
      })
        ? ''
        : self.time.pokemons.push(pokemon);

      isDesableAll();
    };

    //Remove um pokemon
    self.delPokemon = function(pokemon) {
      self.time.pokemons = self.time.pokemons.filter(function(ele) {
        return ele.name !== pokemon.name;
      });

      isDesableAll();
    };

    //Adiciona habilidades
    self.addHabilidades = function(habilidade) {
      if (self.pokemon === null || self.pokemon.name === null) return;

      if (!self.pokemon.habilidades) {
        self.pokemon.habilidades = [];
      }
      self.pokemon.habilidades.find(function(ele) {
        return ele.id === habilidade.id;
      })
        ? ''
        : self.pokemon.habilidades.push(habilidade);

      self.isDesableAllSkill();
    };

    // Remove habilidades
    self.delHabilidade = function(habilidades) {
      self.pokemon.habilidades = self.pokemon.habilidades.filter(function(ele) {
        return ele.id !== habilidades.id;
      });

      self.isDesableAllSkill();
    };

   
  }
]);
