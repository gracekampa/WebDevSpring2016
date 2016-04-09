/**
 * Created by OWNER on 3/22/2016.
 */
module.exports = function(app, userModel) {

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
                },
                // reject promise if error
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user) {
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
            .then(
                function(stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}