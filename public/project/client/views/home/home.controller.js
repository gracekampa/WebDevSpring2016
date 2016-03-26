/**
 * Created by OWNER on 3/24/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, OmdbService, $rootScope) {

        $scope.newMovies = OmdbService.findNewestMovies();

        var vm = this;
        //var imdbID = $routeParams.imdbID;
        //var currentUser = $rootScope.currentUser;
        //vm.favorite = favorite;

        function init() {
            console.log("In Home Controller");
            OmdbService
                .findNewestMovies()
                .then(function(response){
                    vm.data = response.data;
                });
        }
        init();

    }

})();