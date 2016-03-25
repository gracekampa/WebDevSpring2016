/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope, $routeParams) {

        //$scope.error = null;
        //$scope.message = null;

        //$rootScope.currentUser = UserService.getCurrentUser();
        //if (!$rootScope.currentUser) {
        //    $location.url("/home");
        //}

        //$scope.update = update;

        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.update = update;

        var username = $rootScope.currentUser.username;
        console.log(username);

        function init() {
            UserService
                .getProfile()
                .then(function (response) {
                    vm.profile = response.data;
                    console.log(vm.profile);
                });
        }
        return init();

        function update(user) {
            UserService
                .updateUser(user)
                .then (
                    function(response) {
                        vm.profile = response.data;
                        vm.message = "User updated successfully";
                        UserService.setCurrentUser($rootScope.currentUser);
                    },
                    function (err) {
                        vm.error = err;
                        vm.message = "Unable to update the user";
                    }
                );
        }
    }
})();