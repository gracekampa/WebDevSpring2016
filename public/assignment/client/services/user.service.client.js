/**
 * Created by OWNER on 2/23/2016.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        var services = {

            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            deleteUserById: deleteUserById,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser

        };
        return services;

        function findUserByCredentials(credentials) {
            $http.get("/api/assignment/user?username=" + credentials.username + "&password=" + credentials.password);
        }

        function findAllUsers() {
            $http.get("/api/assignment/user");
        }

        function createUser(user) {
            $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId) {
            $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user) {
            $http.put("/api/assignment/user/" + userId, user);
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByUsername (username) {
            return $http.get("/api/assignment/user?username=" + username);
        }
    }
})();