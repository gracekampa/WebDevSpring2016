/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("LoginController", loginController);

    function loginController ($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login (user) {
            UserService.findUserByUsernameAndPassword(user.username, user.password,
                function(user) {
                    if (user) {
                        UserService.setCurrentUser(user);
                        $location.url("/profile");
                    }
                })
        }
    }
})();