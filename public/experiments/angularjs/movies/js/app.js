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

        // event handler declarations
        $scope.addMovie = addMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;

        // event handler implementations
        function addMovie(movie) {
            //console.log("addMovie: " + $scope.movie.title );
            var newMovie = {
                id: $scope.movie.id,
                title: $scope.movie.title,
                director: $scope.movie.director
            };
            $scope.movies.push(newMovie);
        }

        function deleteMovie(movie) {
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);
        }

        var selectedMovieIndex = -1;
        function selectMovie(movie) {
            selectedMovieIndex = $scope.movies.indexOf(movie);
            // we're making a copy of the movie so that when we type, it doesn't change what is on the screen until we say ok
            $scope.movie = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            };
        }

        function updateMovie(movie) {
            // we're making a copy of the movie so that when we type, it doesn't change what is on the screen until we say ok
            // we update the one of the movie index that we selected
            if(selectedMovieIndex >= 0) {
                $scope.movies[selectedMovieIndex] = {
                    id: movie.id,
                    title: movie.title,
                    director: movie.director
                }
            }
        }
    }
})();