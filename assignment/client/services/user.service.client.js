/**
 * Created by OWNER on 2/23/2016.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
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
            return $http.post("/api/assignment/user", credentials);
        }

        function getProfile() {
            return $http.get("/api/assignment/profile/"+$rootScope.currentUser._id);
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function login(credentials) {
            console.log('Inside login client');
            return $http.post("/api/assignment/login", credentials);
        }

        function updateUser (user) {
            return $http.put("/api/assignment/user/"+user.username, user);
        }
    }
})();