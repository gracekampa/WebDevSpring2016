/**
 * Created by OWNER on 2/23/2016.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    //function UserService($rootScope, $http) {
    //
    //    var services = {
    //
    //        findUserByUsername: findUserByUsername,
    //        updateUser: updateUser,
    //        setCurrentUser: setCurrentUser,
    //        getCurrentUser: getCurrentUser,
    //        deleteUserById: deleteUserById,
    //        findUserByCredentials: findUserByCredentials,
    //        findAllUsers: findAllUsers,
    //        createUser: createUser
    //
    //    };
    //    return services;
    //
    //    function findUserByCredentials(credentials) {
    //        $http.get("/api/assignment/user?username=" + credentials.username + "&password=" + credentials.password);
    //    }
    //
    //    function findAllUsers() {
    //        $http.get("/api/assignment/user");
    //    }
    //
    //    function createUser(user) {
    //        $http.post("/api/assignment/user", user);
    //    }
    //
    //    function deleteUserById(userId) {
    //        $http.delete("/api/assignment/user/" + userId);
    //    }
    //
    //    function updateUser(userId, user) {
    //        $http.put("/api/assignment/user/" + userId, user);
    //    }
    //
    //    function setCurrentUser (user) {
    //        $rootScope.currentUser = user;
    //    }
    //
    //    function getCurrentUser () {
    //        return $rootScope.currentUser;
    //    }
    //
    //    function findUserByUsername (username) {
    //        return $http.get("/api/assignment/user?username=" + username);
    //    }
    //}

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
            return $http.post("/api/project/user", credentials);
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