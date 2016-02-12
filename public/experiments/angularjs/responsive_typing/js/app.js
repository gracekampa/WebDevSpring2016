/**
 * Created by OWNER on 2/11/2016.
 */

(function(){
    angular
        .module("MovieAdminApp", [])
        .controller("MovieListController", MovieListController);

    function MovieListController($scope) {
        $scope.movies = [
            {id: 123, title: "Star Wars", director: "JJ Abrams"},
            {id: 234, title: "Avatar", director: "James Cameron"},
            {id: 345, title: "Aliens", director: "James Cameron"}
        ];

        $scope.addMovie = function() {
            console.log("addMovie: " + $scope.movie.title );
        }
    }
})();