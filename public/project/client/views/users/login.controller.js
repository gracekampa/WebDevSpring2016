/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("MovieApp")
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