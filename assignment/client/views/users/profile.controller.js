/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope) {

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

        //$scope.error = null;
        //$scope.message = null;
        //
        //$rootScope.currentUser = UserService.getCurrentUser();
        //if (!$rootScope.currentUser) {
        //    $location.url("/home");
        //}
        //
        //$scope.update = update;
        //
        //function update(user) {
        //    // same validation as register
        //    $scope.error = null;
        //    $scope.message = null;
        //
        //    $rootScope.currentUser = UserService.updateUser(user._id, user)
        //        .then(function(response) {
        //            if (response.data) {
        //                $rootScope.data = response;
        //                $scope.message = "User updated successfully";
        //                UserService.setCurrentUser($rootScope.currentUser);
        //            }
        //            else {
        //                $scope.message = "Unable to update the user";
        //            }
        //        });
        //
        //    //if (user) {
        //    //    $scope.message = "User updated successfully";
        //    //    UserService.setCurrentUser($rootScope.currentUser);
        //    //} else {
        //    //    $scope.message = "Unable to update the user";
        //    //}
        //}
    }
})();