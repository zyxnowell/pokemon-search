(function () {
    "use strict";
    angular.module("app.pokemon.services", [])

        .factory("pokemonService", ["$http",
            function ($http, growl) {
                var processError = function (response) {
                    if (response.status == 404)
                        growl.error("Object not found");
                    else
                        growl.error(response.data);
                }
                return {
                    getAllPokemons: function () {
                        return $http.get("http://pokeapi.co/api/v2/pokemon/?limit=811", {})
                            .then(function (response) {
                                return response.data || [];
                            }, function (response) {
                                processError(response);
                                return response;
                            });
                    }
                }
            }])
})();