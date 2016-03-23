/**
 * Created by OWNER on 3/2/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, OmdbService, $rootScope, $location, MovieService) {
        //$scope.imdbID = $routeParams.imdbID;
        //
        //OmdbService.findMovieByImdbId($scope.imdbID, render)
        //
        //function render(response) {
        //    $scope.movie = response;
        //}

        var vm = this;
        var imdbID = $routeParams.imdbID;
        var currentUser = $rootScope.currentUser;
        vm.favorite = favorite;

        function init() {
            console.log("In Details Controller");
            OmdbService
                .findMovieByImdbId(imdbID)
                .then(function(response){
                    vm.data = response.data;
                });

            MovieService
                .findUserLikes(imdbID)
                .then(function(response){
                    vm.movie = response.data;
                });
        }
        init();

        function favorite(movie) {
            if(currentUser) {
                vm.movie.likes = [];
                vm.movie.likes.push(currentUser._id);
                MovieService
                    .userLikesMovie(currentUser._id, movie);
            } else {
                $location.url("/login");
            }
        }
    }
})();