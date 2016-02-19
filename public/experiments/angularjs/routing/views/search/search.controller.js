/**
 * Created by OWNER on 2/16/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("SearchController", SearchController);

    function SearchControlller($scope, $location, $routeParams, OmdbService) {
        $scope.search = search;

        var title = $routeParams.title;
        if(title) {
            search(title);
        }

        function search(title){
            $location.url("/search/"+title);
            console.log(title);
            OmdbService.findMoviesByTitle(title, render);
            //$http.get("http://www.omdbapi.com/?s=" + title)
            //    .success(render);
        }

        function render(response) {
            $scope.data = response;
        }
    }
})