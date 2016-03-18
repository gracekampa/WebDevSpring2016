/**
 * Created by OWNER on 3/14/2016.
 */
module.exports = function (app, model, db) {

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland", getUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var user = req.body;
        user._id = now.getTime();
        model.createUser(user);
        res.send(200);
    }

    function getAllUsers(req, res) {
        var users = model.findAllUsers();
        res.json(users);
    }

    function getUserById(req, res) {
        var id = req.params.id;
        var user = model.findUserById(id);
        if (user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        var user = model.findUserByUsername(username);
        if (user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
    }

    function getUserByCredentials(req, res) {
        //var credentials = [
        //    {   username: req.query.username,
        //        password: req.query.password
        //    }]
        //var user = model.findUserByUsername(credentials.username);
        //if (credentials) {
        //    res.json(user);
        //    return;
        //}
        //res.json({message: "User not found"});

        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        var user = model.findUserByCredentials(credentials);

        res.json(user);


        //if (user) {
        //    res.json(user);
        //    return;
        //}
        //res.send(null);
    }

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        user = model.updateUser(id, user);
        if (user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
    }

    function deleteUserById(req, res) {
        var id = req.params.id;
        user = model.deleteUser(id);
        if (user) {
            res.send(200);
            return;
        }
        res.json({message: "User not found"});
    }

}