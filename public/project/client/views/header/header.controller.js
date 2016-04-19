/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("HeaderController", headerController);

    function headerController($location, UserService, $scope, $rootScope) {
        var vm = this;

        vm.logout = logout;

        function init() {
            vm.$location = $location;
        }

        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function (err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();