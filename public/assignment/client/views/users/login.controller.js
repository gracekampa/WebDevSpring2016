/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController (UserService, $location, $scope) {
        var vm = this;

        vm.login = login;
        //$scope.message = message;

        function init() {}
        init();

        function login(user) {
            console.log('Inside Login');
            if(!user || !user.username || !user.password) {
                //$scope.message = "Please fill in the required fields.";
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
                },
                function(error) {
                    //$scope.message = "Invalid credentials.";
                    return;
                });
        }
    }
})();