/**
 * Created by OWNER on 2/23/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var model = {
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
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function createUser (user) {
            var newUser = {
                username: user.username,
                password: user.password
            };
            model.users.push(newUser);
            return newUser;
        }

        function findUserByUsername (username) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    return model.users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(credentials) {
            for (var u in model.users) {
                if (model.users[u].username === credentials.username &&
                    model.users[u].password === credentials.password) {
                    return model.users[u];
                }
            }
            return null;
        }

        function updateUser (currentUser) {
            var user = model.findUserByUsername (currentUser.username);
            if (user != null) {
                user.firstName = currentUser.firstName;
                user.lastName = currentUser.lastName;
                user.password = currentUser.password;
                return user;
            } else {
                return null;
            }
        }
    }
})();