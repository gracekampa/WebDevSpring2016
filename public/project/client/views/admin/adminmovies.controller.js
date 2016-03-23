/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("AdminMoviesController", AdminMoviesController);

    function AdminMoviesController($scope, AdminMovieService, $rootScope) {

        $scope.addMovie = addMovie;
        $scope.updateMovie = updateMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMovie = selectMovie;

        $scope.movies = AdminMovieService.getAllMovies();

        function addMovie(movie) {
            var newMovie = {
                title : movie.title,
                director : movie.director,
                year: movie.year,
                details: movie.details

            };
            $scope.movies.push(newMovie);

        }

        function updateMovie(movie) {
            $scope.movies[$scope.selectedMovieIndex] = {
                title: movie.title,
                director : movie.director,
                year: movie.year,
                details: movie.details
            }
        };

        function deleteMovie(index) {
            $scope.movies.splice(index, 1);
        };


        function selectMovie(index) {
            $scope.selectedMovieIndex = index;
            $scope.movie = {
                title: $scope.movies[index].title,
                director : $scope.movies[index].director,
                year: $scope.movies[index].year,
                details: $scope.movies[index].details
            };
        };

    }

})();
