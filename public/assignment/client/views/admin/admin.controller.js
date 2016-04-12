/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController(UserService, $location) {
        var vm = this;

        vm.createUser = createUser;

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function(response) {
                        if (response.data) {
                            vm.users = response.data;
                        }
                    });
        }
        init();

        function createUser(user) {
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