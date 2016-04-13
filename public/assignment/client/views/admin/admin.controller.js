/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController(UserService, $location, $scope) {
        $scope.removeUser = removeUser;
        $scope.updateUser = updateUser;
        $scope.addUser    = addUser;
        $scope.selectUser = selectUser;

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function removeUser(user)
        {
            UserService
                .deleteUser(user._id)
                .then(handleSuccess, handleError);
        }

        function updateUser(user)
        {
            UserService
                .updateUser(user._id, user)
                .then(handleSuccess, handleError);
        }

        function addUser(user)
        {
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function selectUser(user)
        {
            $scope.user = angular.copy(user);
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }

        //var vm = this;
        //
        //vm.createUser = createUser;
        //
        //function init() {
        //    UserService
        //        .findAllUsers()
        //        .then(
        //            function(response) {
        //                if (response.data) {
        //                    vm.users = response.data;
        //                }
        //            });
        //}
        //init();
        //
        //function createUser(user) {
        //    UserService
        //        .register(user)
        //        .then(function(response){
        //            var currentUser = response.data;
        //            if(currentUser != null) {
        //                UserService.setCurrentUser(currentUser);
        //                $location.url("/profile");
        //            }
        //        });
        //}
    }
})();