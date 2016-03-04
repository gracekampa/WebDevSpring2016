/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope) {

        $scope.error = null;
        $scope.message = null;

        $rootScope.currentUser = UserService.getCurrentUser();
        if (!$rootScope.currentUser) {
            $location.url("/home");
        }

        $scope.update = update;

        function update(user) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            $rootScope.currentUser = UserService.updateUser(user._id, user,
            function(user) {
                if (user) {
                    $scope.message = "User updated successfully";
                    UserService.setCurrentUser($rootScope.currentUser);
                } else {
                    $scope.message = "Unable to update the user";
                }
            });

            //if (user) {
            //    $scope.message = "User updated successfully";
            //    UserService.setCurrentUser($rootScope.currentUser);
            //} else {
            //    $scope.message = "Unable to update the user";
            //}
        }
    }
})();