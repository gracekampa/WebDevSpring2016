/**
 * Created by OWNER on 3/2/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .factory("OmdbService", omdbService);

    function omdbService($http) {

        var api = {
            findMovieByTitle: findMovieByTitle,
            findMovieByImdbId: findMovieByImdbId
            //findNewestMovies: findNewestMovies
        };

        return api;

        function findMovieByTitle(title) {
            // return $http.get("http://www.omdbapi.com/?s="+title);
            // use JSONP since API does not support CORS
            return $http.jsonp("http://www.omdbapi.com/?s="+title+"&callback=JSON_CALLBACK");
        }

        function findMovieByImdbId(imdbId) {
            // use JSONP since API does not support CORS
            return $http.jsonp("http://www.omdbapi.com/?i="+imdbId+"&callback=JSON_CALLBACK");
        }

        //function findNewestMovies() {
        //    var date = new Date().year;
        //    return $http.jsonp("http://www.omdbapi.com/?y="+date+"&callback=JSON_CALLBACK");
        //}
    }
})();