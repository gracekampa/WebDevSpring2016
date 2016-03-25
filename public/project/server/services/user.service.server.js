/**
 * Created by OWNER on 3/22/2016.
 */
module.exports = function(app, movieModel, userModel) {
    //app.post("/api/project/user", findUserByCredentials);
    //app.post("/api/project/login", login);
    //app.get("/api/project/loggedin", loggedin);
    //app.post("/api/project/logout", logout);
    //app.post("/api/project/register", register);
    //app.get("/api/project/profile/:userId", profile);
    //
    //function findUserByCredentials(req, res) {
    //    var credentials = req.body;
    //    //model.findUserByCredentials(credentials);
    //    var user = model.findUserByCredentials(credentials);
    //    res.json(user);
    //}
    //
    //var test = "test"
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
    //function register(req, res) {
    //    var user = req.body;
    //
    //    userModel.createUser(user)
    //        // handle model promise
    //        .then(
    //            // login user if promise resolved
    //            function (doc) {
    //                req.session.currentUser = doc;
    //                res.json(doc);
    //            },
    //            // send error if promise rejected
    //            function ( err ) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}
    //
    //function login(req, res) {
    //    console.log('inside server login');
    //    var credentials = req.body;
    //    userModel.findUserByCredentials(credentials)
    //        .then(
    //            function (doc) {
    //                req.session.currentUser = doc;
    //                res.json({message: "hello"});
    //                //res.json(doc);
    //            },
    //            // send error if promise rejected
    //            function ( err ) {
    //                res.status(400).send(err);
    //            }
    //        )
    //}
    //
    //function loggedin(req, res) {
    //    res.json(req.session.currentUser);
    //}
    //
    //function logout(req, res) {
    //    req.session.destroy();
    //    res.send(200);
    //}

    app.post("/api/project/login", login);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);
    app.get("/api/project/profile/:userId", profile);
    app.put ("/api/user/:username", updateUser);


    function login(req, res) {
        var credentials = req.body;

        console.log("Inside server login");

        userModel.findUserByCredentials(credentials)
            .then(
                function(doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function loggedin(req, res) {
        // store current user in session
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function register(req, res) {
        var user = req.body;

        console.log("Inside register server");

        userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function(doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function profile(req, res) {
        var userId = req.params.userId;
        var user = null;

        // use model to find user by id
        UserModel.findUserById(userId)
            .then(
                // first retrieve the user by user id
                function(doc) {
                    user = doc;
                    // fetch courses this user likes
                    return movieModel.findMoviesByImdbIDs(doc.likes);
                },
                // reject promise if error
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch movies this user likes
                function(movies) {
                    // list of movies this user likes
                    // movies are not stored in database
                    // only added for UI rendering
                    user.likesMovies = movies;
                    res.json(user);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser (req, res) {
        var username = req.params.username;
        var user = req.body;
        userModel
            .updateUser(username, user)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}