/**
 * Created by OWNER on 2/18/2016.
 */

(function(){
    angular
        .module("MovieApp")
        .controller("DetailsController", detailsController);

    function detailsController($scope, $routeParams, OmdbService) {
        $scope.imdbID = $routeParams.imdbID;

        OmdbService.findMoviesByImdbId($scope.imdbID, render);

        //$http.get("" + $scope.imdbID)
        //    .success(render);

        function render(response) {

        }
    }
})();