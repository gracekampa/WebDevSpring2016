/**
 * Created by OWNER on 2/18/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .factory("OmdbService", omdbService);

    function omdbService() {

        var api = {
            findMoviesByTitle: findMoviesByTitle,
            findMoviesByImdbId: findMoviesByImdbId
        };

        return api;

        function findMoviesByTitle(title, callback) {
            $http.get("http://www.omdbapi.com/?s=" + title)
                .success(callback);
        }

        function findMoviesByImdbId(imbdId) {
            $location.url("/search/"+title);
            console.log(title);
            $http.get("http://www.omdbapi.com/?s=" + title)
                .success(render);
        }
    }
})