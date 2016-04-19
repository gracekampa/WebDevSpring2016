/**
 * Created by OWNER on 3/22/2016.
 */
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
//var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose         = require("mongoose");

module.exports = function(app, movieModel, userModel) {
    //app.post("/api/project/login", login);
    //app.get("/api/project/loggedin", loggedin);
    //app.post("/api/project/logout", logout);
    //app.post("/api/project/register", register);
    //app.get("/api/project/profile/:userId", profile);
    //app.put("/api/project/user/:username", updateUser);
    //
    //
    //function login(req, res) {
    //    var credentials = req.body;
    //
    //    console.log("Inside server login");
    //
    //    userModel.findUserByCredentials(credentials)
    //        .then(
    //            function(doc) {
    //                req.session.currentUser = doc;
    //                res.json(doc);
    //            },
    //            // send error if promise rejected
    //            function(err) {
    //                res.status(400).send(err);
    //            }
    //        )
    //}
    //
    //function loggedin(req, res) {
    //    // store current user in session
    //    res.json(req.session.currentUser);
    //}
    //
    //function logout(req, res) {
    //    req.session.destroy();
    //    res.send(200);
    //}
    //
    //function register(req, res) {
    //    var user = req.body;
    //
    //    console.log("Inside register server");
    //
    //    userModel.createUser(user)
    //        // handle model promise
    //        .then(
    //            // login user if promise resolved
    //            function(doc) {
    //                req.session.currentUser = doc;
    //                res.json(doc);
    //            },
    //            // send error if promise rejected
    //            function(err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}
    //
    ////function profile(req, res) {
    ////    var userId = req.params.userId;
    ////    var user = null;
    ////
    ////    // use model to find user by id
    ////    userModel.findUserById(userId)
    ////        .then(
    ////            // first retrieve the user by user id
    ////            function(doc) {
    ////                user = doc;
    ////                // fetch courses this user likes
    ////                return movieModel.findMoviesByImdbIDs(doc.likes);
    ////            },
    ////            // reject promise if error
    ////            function(err) {
    ////                res.status(400).send(err);
    ////            }
    ////        )
    ////        .then(
    ////            // fetch movies this user likes
    ////            function(movies) {
    ////                // list of movies this user likes
    ////                // movies are not stored in database
    ////                // only added for UI rendering
    ////                user.likesMovies = movies;
    ////                res.json(user);
    ////            },
    ////            // send error if promise rejected
    ////            function(err) {
    ////                res.status(400).send(err);
    ////            }
    ////        );
    ////}
    //
    //function profile(req, res) {
    //    var userId = req.params.userId;
    //    var user = null;
    //
    //    // use model to find user by id
    //    userModel.findUserById(userId)
    //        .then(
    //
    //            // first retrieve the user by user id
    //            function (doc) {
    //
    //                user = doc;
    //
    //                // fetch movies this user likes
    //                return movieModel.findMoviesByImdbIDs(doc.likes);
    //            },
    //
    //            // reject promise if error
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        )
    //        .then(
    //            // fetch movies this user likes
    //            function (movies) {
    //
    //                // list of movies this user likes
    //                // movies are not stored in database
    //                // only added for UI rendering
    //                user.likesMovies = movies;
    //                res.json(user);
    //            },
    //
    //            // send error if promise rejected
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        )
    //}
    //
    ////function updateUser (req, res) {
    ////    console.log("Inside User Server");
    ////    var username = req.params.username;
    ////    var user = req.body;
    ////    userModel
    ////        .updateUser(username, user)
    ////        .then (
    ////            function (doc) {
    ////                req.session.currentUser = doc;
    ////                res.json(doc);
    ////                res.send(200);
    ////            },
    ////            function (err) {
    ////                res.status(400).send(err);
    ////            }
    ////        );
    ////}
    //
    //function updateUser (req, res) {
    //    console.log("Inside User Server");
    //    var username = req.params.username;
    //    var user = req.body;
    //    userModel
    //        .updateUser(username, user)
    //        .then(
    //            function(stats) {
    //                res.send(200);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

    var auth = authorized;
    app.post  ('/api/project/login', passport.authenticate('project'), login);
    app.post  ('/api/project/logout',         logout);
    app.post  ('/api/project/register',       register);
    app.post  ('/api/project/admin/user',     auth, createUser);
    app.get   ('/api/project/loggedin',       loggedin);
    app.get   ('/api/project/admin/user',     auth, findAllUsers);
    app.get   ("/api/project/admin/user/:userId", findUserById);
    app.put   ('/api/project/user/:username', updateUser);
    app.put   ('/api/project/admin/user/:id', auth, updateUserAdmin);
    app.delete('/api/project/admin/user/:id', auth, deleteUser);
    app.get("/api/project/profile/:userId", profile);

    //passport.use(new LocalStrategy(localStrategy));
    passport.use('project',   new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function projectLocalStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        //newUser.roles = ['user', 'admin'];
        newUser.roles = ['user'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        console.log("inside admin user service");
        if(isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function findUserById (req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        if(isAdmin(req.user)) {

            userModel
                .removeUser(req.params.id)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function updateUser (req, res) {
        console.log("Inside User Server");
        var username = req.params.username;
        var user = req.body;
        userModel
            .updateUser(username, user)
            .then(
                function(stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserAdmin(req, res) {
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUserAdmin(req.params.id, newUser)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") != -1) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function profile(req, res) {
        var userId = req.params.userId;
        var user = null;

        // use model to find user by id
        userModel.findUserById(userId)
            .then(

                // first retrieve the user by user id
                function (doc) {

                    user = doc;

                    // fetch movies this user likes
                    return movieModel.findMoviesByImdbIDs(doc.likes);
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch movies this user likes
                function (movies) {

                    // list of movies this user likes
                    // movies are not stored in database
                    // only added for UI rendering
                    user.likesMovies = movies;
                    res.json(user);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }


    //function profile(req, res) {
    //    var userId = req.params.userId;
    //    var user = null;
    //
    //    // use model to find user by id
    //    userModel.findUserById(userId)
    //        .then(
    //            // first retrieve the user by user id
    //            function(doc) {
    //                user = doc;
    //            },
    //            // reject promise if error
    //            function(err) {
    //                res.status(400).send(err);
    //            }
    //        )
    //        .then(
    //            function(user) {
    //                res.json(user);
    //            },
    //            // send error if promise rejected
    //            function(err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}
}