/**
 * Created by OWNER on 2/23/2016.
 */
//(function(){
//    angular
//        .module("MovieApp")
//        .controller("RegisterController", registerController);
//
//    function registerController($location, $scope, UserService, $rootScope) {
//        $scope.message = null;
//        $scope.register = register;
//
//        function register(user) {
//            $scope.message = null;
//            if (user == null) {
//                $scope.message = "Please fill in the required fields";
//                return;
//            }
//            if (!user.username) {
//                $scope.message = "Please provide a username";
//                return;
//            }
//            if (!user.password || !user.password2) {
//                $scope.message = "Please provide a password";
//                return;
//            }
//            if (user.password != user.password2) {
//                $scope.message = "Passwords must match";
//                return;
//            }
//            var newUser = UserService.findUserByUsername(user.username);
//            if (newUser != null) {
//                $scope.message = "User already exists";
//                return;
//            }
//            UserService.createUser(user,
//            function(user) {
//                if (user) {
//                    UserService.setCurrentUser(user);
//                    $location.url("/profile");
//                }
//            });
//            //$rootScope.currentUser = newUser;
//            ////UserService.setCurrentUser(newUser);
//            //$location.url("/profile");
//        }
//    }
//})();

(function(){
    angular
        .module("MovieApp")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location) {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            console.log("In register");
            UserService
                .register(user)
                .then(function(response){
                    var currentUser = response.data;
                    if(currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    }
                });
        }
    }
})();