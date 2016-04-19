/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $location, $scope) {
        var vm = this;
        $scope.removeUser = removeUser;
        $scope.updateUser = updateUser;
        $scope.addUser    = addUser;
        $scope.selectUser = selectUser;

        $scope.predicate = 'username';
        $scope.reverse = true;
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        }

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
                .updateUserAdmin(user._id, user)
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
            //UserService
            //    .findUserById(user._id)
            //    .then(
            //        function(response) {
            //            //$scope.form = response.data;
            //            //vm.form = {title: form.title};
            //            vm.user = user;
            //            vm.user.username = user.username;
            //            vm.user.password = user.password;
            //            vm.user.firstName = user.firstName;
            //            vm.user.lastName = user.lastName;
            //            vm.user.role = user.role;
            //        },
            //        function(err) {
            //            vm.error = err;
            //        }
            //    );
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }
    }

})();
