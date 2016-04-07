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
            //console.log("Details: "+currentUser.username+currentUser.likes);
            //console.log("In Details Controller");
            OmdbService
                .findMovieByImdbId(imdbID)
                .then(function(response){
                    vm.data = response.data;
                });

            MovieService
                .findUserLikes(imdbID)
                .then(function(response){
                    vm.movie = response.data;
                    //console.log(vm.movie);
                });
        }
        init();

        function favorite(movie) {
            if(currentUser) {
                vm.movie.likes = [];
                vm.movie.likes.push(currentUser);
                MovieService
                    .userLikesMovie(currentUser._id, movie);
                //console.log(currentUser);
            } else {
                $location.url("/login");
            }
        }
    }
})();