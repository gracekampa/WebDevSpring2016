/**
 * Created by OWNER on 2/23/2016.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            login: login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            register: register,
            logout: logout,
            getProfile: getProfile,
            deleteUser: deleteUser,
            updateUser: updateUser,
            updateUserAdmin: updateUserAdmin,
            createUser: createUser
        };
        return api;

        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        function findUserById(userId) {
            return $http.get("/api/assignment/admin/user/" + userId, userId);
        }

        function findUserByCredentials(credentials) {
            //return $http.post("/api/project/user", credentials);
            return $http.get("/api/assignment/user", credentials);
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

        function updateUser(user) {
            return $http.put("/api/assignment/user/"+user.username, user);
        }

        function updateUserAdmin(userId, user) {
            console.log(user);
            return $http.put("/api/assignment/admin/user/"+userId, user);
        }

        function createUser(user) {
            return $http.post('/api/assignment/admin/user', user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/assignment/admin/user/'+userId);
        }
    }
})();