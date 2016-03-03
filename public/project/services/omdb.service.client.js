/**
 * Created by OWNER on 3/2/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .factory("OmdbService", omdbService);

    function omdbService($http) {

        var api = {
            findMoviesByTitle: findMoviesByTitle,
            findMovieByImdbId: findMovieByImdbId
        };

        return api;

        function findMoviesByTitle(title, callback) {
            $http.get("http://www.omdbapi.com/?s=" + title)
                .success(callback);
        }

        function findMovieByImdbId(imdbId, callback) {
            $http.get("http://www.omdbapi.com/?i=" + imdbId)
                .success(callback);
        }
    }
})();