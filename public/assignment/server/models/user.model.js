/**
 * Created by OWNER on 3/17/2016.
 */
var mock = require("./user.mock.json");

module.exports = function() {
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser (user) {
        var newUser = {
            _id: "id:" + (new Date()).getTime(),
            username: user.username,
            password: user.password
        };
        mock.push(newUser);
        return newUser;
    }

    function updateUser(userId, user) {
        var idx = mock.indexOf(findUserById(userId));
        mock[idx].firstName = user.firstName;
        mock[idx].lastName = user.lastName;
        mock[idx].users[u].password = user.password;
        return mock;
    }

    function findAllUsers () {
        return mock;
    }

    function findUserById(id) {
        for(var i=0; i<mock.length; i++) {
            if(mock[i].id == id) {
                return mock[i];
            }
        }
    }

    function deleteUser (id) {
        var user = findUserById(id);
        var idx = mock.indexOf(user);
        mock.splice(idx, 1);
        return mock;
    }

    function findUserByUsername(username) {
        for (var u in mock) {
            if (mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var u in mock) {
            if (mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }
}