/**
 * Created by OWNER on 2/25/2016.
 */
(function() {
    angular
        .module("MovieApp")
        .factory("AdminMovieService", AdminMovieService);

    function AdminMovieService() {

        var services = {
            movies: [
                {"_id": "000", "title": "Star Wars", "director": "JJ Abrams", "year": 1977, "details": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookie..."},
                {"_id": "010", "title": "Avatar",     "director": "James Cameron", "year": 2009, "details": "A paraplegic marine dispatched to the moon Pandora..."},
                {"_id": "020", "title": "Aliens",      "director": "James Cameron", "year": 1986, "details": "The commercial vessel Nostromo receives a distress call from an unexplored..."}
            ],

            getAllMovies: getAllMovies,
            createMovieForUser: createMovieForUser,
            findAllLikesForUser: findAllLikesForUser,
            deleteMovieById: deleteMovieById,
            updateMovieById: updateMovieById,
            findMovieById: findMovieById

        };
        return services;

        function getAllMovies() {
            return services.movies;
        }

            function createMovieForUser(userId, movie, callback) {
                var newMovie = {
                     _id: "id:" + (new Date()).getTime(),
                     title: movie.title,
                     director: movie.director,
                     year: movie.year,
                     details: movie.details
                };

                services.movies.push(newMovie);
                callback(newMovie);
                return newMovie;
            }

            function findAllLikesForUser(userId, callback) {


            }

            function deleteMovieById(movieId, callback) {
                for (var i in services.movies) {
                    if (services.movies[i]._id === movieId) {
                        services.movies.splice(i, 1);
                    }
                }
                callback(services.movies);
            }

            function updateMovieById(movieId, newMovie, callback) {
                var movie = services.findMovieById(movieId);
                if (movie != null) {
                    movie._id = newMovie._id;
                    movie.title = newMovie.title;
                    movie.director = newMovie.director;
                    movie.year = newMovie.year;
                    movie.details = newMovie.details;
                    callback(movie);
                } else {
                    return null;
                }
            }

        function findMovieById (movieId) {
            for (var i in services.movies) {
                if (services.movies[i]._id === movieId) {
                    return services.movies[i];
                }
            }
            return null;
        }
    }
})();