/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($location, $scope, UserService, $rootScope) {
        $scope.message = null;
        $scope.register = register;

        function register(user) {
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            var newUser = UserService.findUserByUsername(user.username)
                .then(function(response) {
                    if(response.data !== "null") {
                        $scope.message = "User already exists";
                        return;
                    }
                    else {
                        UserService.createUser(user)
                            .then(function(response) {
                                $rootScope.data = response;
                                UserService.setCurrentUser(response.data[response.data.length - 1]);
                                $location.url("/profile/" + response.data[response.data.length - 1]);
                            });
                    }
                });
            //if (newUser != null) {
            //    $scope.message = "User already exists";
            //    return;
            //}
            //UserService.createUser(user);
            ////$rootScope.currentUser = newUser;
            //UserService.setCurrentUser(newUser);
            //$location.url("/profile");
        }
    }
})();