/**
 * Created by OWNER on 2/23/2016.
 */

//(function() {
//    angular
//        .module("MovieApp")
//        .factory("UserService", UserService);
//
//    function UserService($http, $rootScope) {
//
//        var api = {
//            findUserByUsername: findUserByUsername,
//            updateUser: updateUser,
//            setCurrentUser: setCurrentUser,
//            getCurrentUser: getCurrentUser,
//
//            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
//            findAllUsers: findAllUsers,
//            createUser: createUser,
//            getAllUsers: getAllUsers
//
//        };
//        return api;
//
//        function findUserByUsernameAndPassword(username, password, callback) {
//            for (var u in services.users) {
//                if (services.users[u].username === username &&
//                    services.users[u].password === password) {
//                    callback(services.users[u]);
//                }
//            }
//            return null;
//        }
//
//        function findAllUsers(callback) {
//            callback(services.users);
//            return services.users;
//        }
//
//        function getAllUsers() {
//            return services.users;
//        }
//
//        function createUser(user, callback) {
//            var newUser = {
//                _id: "id:" + (new Date()).getTime(),
//                username: user.username,
//                password: user.password
//            };
//            services.users.push(newUser);
//            callback(newUser);
//            return newUser;
//        }
//
//        function deleteUserById(userId, callback) {
//            for (var u in services.users) {
//                if (services.users[u]._id === userId) {
//                    services.users.splice(u, 1);
//
//                    callback(services.users);
//                }
//            }
//            return null;
//        }
//
//        function updateUser(userId, user, callback) {
//            for (var u in services.users) {
//                if (services.users[u]._id == userId) {
//                    services.users[u].firstName = user.firstName;
//                    services.users[u].lastName = user.lastName;
//                    services.users[u].password = user.password;
//
//                    callback(services.users[u]);
//                }
//            }
//            return services.users[u];
//        }
//
//        function setCurrentUser (user) {
//            $rootScope.currentUser = user;
//        }
//
//        function getCurrentUser () {
//            return $rootScope.currentUser;
//        }
//
//        function findUserByUsername (username) {
//            for (var u in services.users) {
//                if (services.users[u].username === username) {
//                    return services.users[u];
//                }
//            }
//            return null;
//        }
//    }
//})();

(function(){
    angular
        .module("MovieApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            login: login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            register: register,
            logout: logout,
            getProfile: getProfile
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
    }
})();