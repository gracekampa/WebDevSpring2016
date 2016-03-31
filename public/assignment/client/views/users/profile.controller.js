/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $rootScope, $location) {

        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.currentUser = UserService.getCurrentUser();

        vm.update = update;

        //var username = $rootScope.currentUser.username;
        //console.log(username);

        function init() {
        }
        return init();

        if (!vm.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            UserService
                .updateUser(user)
                .then(
                    function(response) {
                        if (response.data) {
                            vm.currentUser = response.data;
                            $scope.message = "User updated successfully";
                            //console.log(vm.message);
                            //UserService.setCurrentUser(vm.currentUser);
                        }
                    },
                    function (err) {
                        vm.error = err;
                        $scope.error = "Unable to update the user";
                        return;
                    }
                );
        }
    }
})();