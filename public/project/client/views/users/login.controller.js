/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("LoginController", loginController);

    function loginController (UserService, $location, $scope, $rootScope) {
        var vm = this;
        vm.login = login;

        function login(user)
        {
            if(user)
                UserService
                    .login(user)
                    .then(
                        function(response)
                        {
                            $rootScope.currentUser = response.data;
                            $location.url("/profile");
                        },
                        function(err) {
                            $scope.error = err;
                        }
                    );
        }
        //var vm = this;
        //
        //vm.login = login;
        //
        //function init() {
        //}
        //init();
        //
        //function login(user) {
        //    console.log('Inside Login');
        //    if(!user || !user.username || !user.password) {
        //        //$scope.message = "Please fill in the required fields.";
        //        return;
        //    }
        //    //UserService
        //    //    .findUserByCredentials({
        //    //        username: user.username,
        //    //        password: user.password
        //    //    })
        //    //    .then(function(response){
        //    //
        //    //    });
        //
        //    UserService
        //        .login({
        //            username: user.username,
        //            password: user.password
        //        })
        //        .then(function(response){
        //                if(response.data) {
        //                    UserService.setCurrentUser(response.data);
        //                    $location.url("/profile");
        //                }
        //            },
        //            function(error) {
        //                //$scope.message = "Invalid credentials.";
        //                return;
        //            });
        //}
    }
})();