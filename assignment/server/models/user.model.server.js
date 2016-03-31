/**
 * Created by OWNER on 3/17/2016.
 */
var mock = require("./user.mock.json");

module.exports = function(db) {
    //var api = {
    //    createUser: createUser,
    //    findUserById: findUserById,
    //    findAllUsers: findAllUsers,
    //    updateUser: updateUser,
    //    deleteUser: deleteUser,
    //    findUserByUsername: findUserByUsername,
    //    findUserByCredentials: findUserByCredentials
    //};
    //return api;
    //
    //function createUser (user) {
    //    var newUser = {
    //        _id: "id:" + (new Date()).getTime(),
    //        username: user.username,
    //        password: user.password
    //    };
    //    mock.push(newUser);
    //    return newUser;
    //}
    //
    //function updateUser(userId, user) {
    //    var idx = mock.indexOf(findUserById(userId));
    //    mock[idx].firstName = user.firstName;
    //    mock[idx].lastName = user.lastName;
    //    mock[idx].users[u].password = user.password;
    //    return mock;
    //}
    //
    //function findAllUsers () {
    //    return mock;
    //}
    //
    //function findUserById(id) {
    //    for(var i=0; i<mock.length; i++) {
    //        if(mock[i].id == id) {
    //            return mock[i];
    //        }
    //    }
    //}
    //
    //function deleteUser (id) {
    //    var user = findUserById(id);
    //    var idx = mock.indexOf(user);
    //    mock.splice(idx, 1);
    //    return mock;
    //}
    //
    //function findUserByUsername(username) {
    //    for (var u in mock) {
    //        if (mock[u].username === username) {
    //            return mock[u];
    //        }
    //    }
    //    return null;
    //}
    //
    //function findUserByCredentials(credentials) {
    //    for (var u in mock) {
    //        if (mock[u].username === credentials.username &&
    //            mock[u].password === credentials.password) {
    //            return mock[u];
    //        }
    //    }
    //    return null;
    //}

    var mongoose = require("mongoose");

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        //userLikesMovie: userLikesMovie,
        updateUser: updateUser
    };
    return api;

    // add movie to user likes
    //function userLikesMovie (userId, movie) {
    //
    //    var deferred = q.defer();
    //
    //    // find the user
    //    UserModel.findById(userId, function (err, doc) {
    //
    //        // reject promise if error
    //        if (err) {
    //            deferred.reject(err);
    //        } else {
    //
    //            // add movie id to user likes
    //            doc.likes.push (movie.imdbID);
    //
    //            // save user
    //            doc.save (function (err, doc) {
    //
    //                if (err) {
    //                    deferred.reject(err);
    //                } else {
    //
    //                    // resolve promise with user
    //                    deferred.resolve (doc);
    //                }
    //            });
    //        }
    //    });
    //
    //    return deferred;
    //}

    function findUsersByIds (userIds) {
        var deferred = q.defer();

        // find all users in array of user IDs
        UserModel.find({
            _id: {$in: userIds}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    // use user model find by id
    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createUser(user) {

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        console.log(credentials);
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function updateUser (username, user) {
        var deferred = q.defer();
        UserModel
            .update (
                {username: username},
                {$set: user},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }
}