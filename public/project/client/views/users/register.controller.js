/**
 * Created by OWNER on 2/23/2016.
 */


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