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
            //var movieTitle = $routeParams.title;
            //if(movieTitle) {
            //    search(movieTitle);
            //    $location.url("/search/"+movieTitle);
            //}
        }
        init();

        function search(movie) {
            console.log("Inside search");
            console.log(movie.title);
            var movieTitle = movie.title;
            OmdbService
                .findMovieByTitle(movie.title)
                .then(function(response){
                    vm.data = response.data;
                    //$location.url("/search/"+movieTitle);
                });
        }
    }
})();
