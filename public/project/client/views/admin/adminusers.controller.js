/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("AdminUsersController", AdminUsersController);

    function AdminUsersController($scope, UserService, $rootScope) {

        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        $scope.users = UserService.getAllUsers();

        function addUser(user) {
            var newUser = {
                _id: "id:" + (new Date()).getTime(),
                username: user.username,
                password: user.password

            };
            $scope.users.push(newUser);

        }

        function updateUser(user) {
            $scope.users[$scope.selectedUserIndex] = {
                _id: user._id,
                username: user.username,
                password: user.password
            }
        };

        function deleteUser(index) {
            $scope.users.splice(index, 1);
        };


        function selectUser(index) {
            $scope.selectedUserIndex = index;
            $scope.user = {
                username: $scope.users[index].username,
                password: $scope.users[index].password
            };
        };

    }

})();