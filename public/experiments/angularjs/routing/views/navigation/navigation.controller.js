/**
 * Created by OWNER on 2/18/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("NavController", navController);

    function navController($location, $scope) {
        $scope.$location = $location;
    }
})();