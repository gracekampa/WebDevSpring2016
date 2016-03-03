/**
 * Created by OWNER on 2/23/2016.
 */

(function() {
    angular
        .module("MovieApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {

        var services = {
            users: [
                {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]                },
                {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]                },
                {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]                },
                {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]                }
            ],

            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,

            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser

        };
        return services;

        function findUserByUsernameAndPassword(username, password, callback) {
            for (var u in services.users) {
                if (services.users[u].username === username &&
                    services.users[u].password === password) {
                    callback(services.users[u]);
                }
            }
            return null;
        }

        function findAllUsers(callback) {
            callback(services.users);
        }

        function createUser(user, callback) {
            var newUser = {
                _id: "id:" + (new Date()).getTime(),
                username: user.username,
                password: user.password
            };
            services.users.push(newUser);
            callback(newUser);
            return newUser;
        }

        function deleteUserById(userId, callback) {
            for (var u in services.users) {
                if (services.users[u]._id === userId) {
                    services.users.splice(u, 1);

                    callback(services.users);
                }
            }
            return null;
        }

        function updateUser(userId, user, callback) {
            for (var u in services.users) {
                if (services.users[u]._id == userId) {
                    services.users[u].firstName = user.firstName;
                    services.users[u].lastName = user.lastName;
                    services.users[u].password = user.password;

                    callback(services.users[u]);
                }
            }
            return services.users[u];
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByUsername (username) {
            for (var u in services.users) {
                if (services.users[u].username === username) {
                    return services.users[u];
                }
            }
            return null;
        }
    }
})();