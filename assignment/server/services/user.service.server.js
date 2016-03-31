/**
 * Created by OWNER on 3/14/2016.
 */
//module.exports = function (app, model, db) {
//
//    app.post("/api/assignment/user", createUser);
//    app.get("/api/assignment/user", getAllUsers);
//    app.get("/api/assignment/user/:id", getUserById);
//    app.get("/api/assignment/user?username=username", getUserByUsername);
//    app.get("/api/assignment/user?username=alice&password=wonderland", getUserByCredentials);
//    app.put("/api/assignment/user/:id", updateUserById);
//    app.delete("/api/assignment/user/:id", deleteUserById);
//
//    function createUser(req, res) {
//        var user = req.body;
//        user._id = now.getTime();
//        model.createUser(user);
//        res.send(200);
//    }
//
//    function getAllUsers(req, res) {
//        var users = model.findAllUsers();
//        res.json(users);
//    }
//
//    function getUserById(req, res) {
//        var id = req.params.id;
//        var user = model.findUserById(id);
//        if (user) {
//            res.json(user);
//            return;
//        }
//        res.json({message: "User not found"});
//    }
//
//    function getUserByUsername(req, res) {
//        var username = req.query.username;
//        var user = model.findUserByUsername(username);
//        if (user) {
//            res.json(user);
//            return;
//        }
//        res.json({message: "User not found"});
//    }
//
//    function getUserByCredentials(req, res) {
//        //var credentials = [
//        //    {   username: req.query.username,
//        //        password: req.query.password
//        //    }]
//        //var user = model.findUserByUsername(credentials.username);
//        //if (credentials) {
//        //    res.json(user);
//        //    return;
//        //}
//        //res.json({message: "User not found"});
//
//        var credentials = {
//            username: req.query.username,
//            password: req.query.password
//        };
//        var user = model.findUserByCredentials(credentials);
//
//        res.json(user);
//
//
//        //if (user) {
//        //    res.json(user);
//        //    return;
//        //}
//        //res.send(null);
//    }
//
//    function updateUserById(req, res) {
//        var id = req.params.id;
//        var user = req.body;
//        user = model.updateUser(id, user);
//        if (user) {
//            res.json(user);
//            return;
//        }
//        res.json({message: "User not found"});
//    }
//
//    function deleteUserById(req, res) {
//        var id = req.params.id;
//        user = model.deleteUser(id);
//        if (user) {
//            res.send(200);
//            return;
//        }
//        res.json({message: "User not found"});
//    }
//
//}

module.exports = function(app, formModel, userModel) {

    app.post("/api/assignment/login", login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    app.get("/api/assignment/profile/:userId", profile);
    app.put("/api/assignment/user/:username", updateUser);


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
        userModel.findUserById(userId)
            .then(
                // first retrieve the user by user id
                function(doc) {
                    user = doc;
                    // fetch courses this user likes
                    //return movieModel.findMoviesByImdbIDs(doc.likes);
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
        console.log("Inside User Server");
        var username = req.params.username;
        var user = req.body;
        userModel
            .updateUser(username, user)
            .then (
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}