/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, MovieService, BoardService, $location, $rootScope, $routeParams) {

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
        vm.addBoard = addBoard;



        var username = $rootScope.currentUser.username;
        console.log(username);

        function init() {
            UserService
                .getProfile()
                .then(function (response) {
                    vm.profile = response.data;
                    console.log(vm.profile);
                });

            BoardService
                .findAllBoardsForUser($rootScope.currentUser._id)
                .then(
                    function(response) {
                        if (response.data) {
                            vm.boards = response.data;
                            //console.log(vm.boards[0].movies);
                        }
                    });

            //MovieService
            //    .findAllBoardsForUser(vm.currentUser._id)
            //    .then(
            //        function(response) {
            //            if (response.data) {
            //                vm.boards = response.data;
            //            }
            //        });
        }
        return init();

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

        function addBoard(board) {
            var user = $rootScope.currentUser;
            BoardService
                .createBoardForUser(board, user)
                .then (
                    function(response) {
                        vm.boards = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }
})();