/**
 * Created by OWNER on 2/23/2016.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            login: login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            register: register,
            logout: logout,
            getProfile: getProfile,
            updateUser: updateUser
        };
        return api;

        function findUserByCredentials(credentials) {
            //return $http.post("/api/project/user", credentials);
            return $http.get("/api/project/user", credentials);
        }

        function getProfile() {
            return $http.get("/api/project/profile/"+$rootScope.currentUser._id);
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function login(credentials) {
            console.log('Inside login client');
            return $http.post("/api/project/login", credentials);
        }

        function updateUser (user) {
            return $http.put("/api/project/user/"+user.username, user);
        }
    }
})();