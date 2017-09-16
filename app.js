(function () {
    'use strict';
    angular.module("app", [
        "ui.router",
        "ui.bootstrap",
        "app.pokemon",
        "app.pokemon.services" //inject service
    ])
        .config(["$urlRouterProvider", "$stateProvider",
            function ($urlRouterProvider, $stateProvider) {
                $urlRouterProvider.otherwise("/");
            }])
        .run(["$rootScope", "pokemonService",
            function ($rootScope, pokemonService) {
                pokemonService.getAllPokemons()
                    .then(function (pokemons) {
                        $rootScope.pokemons = pokemons;
                    });
            }]);

    angular.module("app.pokemon", [])
        .config(["$stateProvider",
            function ($stateProvider) {
                $stateProvider
                    .state("home", {
                        url: "/",
                        templateUrl: "templates/jumbotron.html",
                        controller: ["$scope", "$rootScope", "pokemonService",
                            function ($scope, $rootScope, pokemonService) {
                                pokemonService.getAllPokemons()
                                    .then(function (pokemons) {
                                        $scope.pokemons = pokemons;
                                        
                                    });
                            }]
                    })
            }
        ])

})();