/**
 * Created by OWNER on 3/2/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, $routeParams, OmdbService) {

        var vm = this;

        vm.search = search;

        function init() {

        }
        init();

        function search(movie) {
            console.log("Inside search");
            OmdbService
                .findMovieByTitle(movie.title)
                .then(function(response){
                    vm.data = response.data;
                });
        }
    }
})();
