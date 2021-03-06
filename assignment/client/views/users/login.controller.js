/**
 * Created by OWNER on 2/23/2016.
 */
//(function(){
//    angular
//        .module("FormBuilderApp")
//        .controller("LoginController", loginController);
//
//    function loginController ($scope, UserService, $location, $rootScope) {
//
//        $scope.login = login;
//        ////$scope.user = {};
//        //function login (user) {
//        //    UserService.findUserByCredentials({username: user.username, password: user.password});
//        //   console.log(response);
//        //    if (user) {
//        //        UserService.setCurrentUser(user);
//        //        $location.url("/profile");
//        //    }
//        //}
//
//        function login(user) {
//            if(!user) {
//                return;
//            }
//            UserService
//                .findUserByCredentials(user.username, user.password)
//                .then(function(response){
//                    if(response.data) {
//                        UserService.setCurrentUser(response.data);
//                        $location.url("/profile");
//                    }
//                });
//        }
//    }
//})();

(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController (UserService, $location) {
        var vm = this;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            console.log('Inside Login');
            if(!user) {
                return;
            }
            //UserService
            //    .findUserByCredentials({
            //        username: user.username,
            //        password: user.password
            //    })
            //    .then(function(response){
            //
            //    });

            UserService
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }
    }
})();