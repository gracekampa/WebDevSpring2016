/**
 * Created by OWNER on 3/22/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .factory("MovieService", movieService);

    function movieService($http) {
        var api = {
            userLikesMovie: userLikesMovie,
            findUserLikes: findUserLikes
        };
        return api;

        function findUserLikes (imdbID) {
            return $http.get("/api/project/movie/"+imdbID+"/user");
        }

        function userLikesMovie(userId, movie) {
            return $http.post("/api/project/user/"+userId+"/movie/"+movie.imdbID, movie);
        }
    }
})();