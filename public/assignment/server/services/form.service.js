/**
 * Created by OWNER on 3/14/2016.
 */
module.exports = function (app, model, db) {

    app.get("/api/assignment/user/:userId/form", getFormByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);

    function createForm(req, res) {
        var userId = req.params.userId;
        model.createForm(userId);
        res.send(200);
    }

    function getAllUsers(req, res) {
        var users = model.findAllUsers();
        res.json(users);
    }

    function getFormByUserId(req, res) {
        var userId = req.params.userId;
        var form = model.findFormByUserId(userId);
        if (form) {
            res.json(form);
            return;
        }
        res.json({message: "Form not found"});
    }

    function getFormById(req, res) {
        var id = req.params._id;
        var form = model.findFormById(id);
        if (form) {
            res.json(form);
            return;
        }
        res.json({message: "Form not found"});
    }

    function getUserByUsername(req, res) {
        var username = req.params.username;
        var user = model.findUserByUsername(username);
        if (user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
    }

    function getUserByCredentials(req, res) {
        var credentials = [
            {   username: req.params.username,
                password: req.params.password
            }]
        var user = model.findUserByUsername(credentials);
        if (credentials) {
            res.json(credentials);
            return;
        }
        res.json({message: "User not found"});
    }

    function updateFormById(req, res) {
        var id = req.params._id;
        var form = req.body;
        form = model.updateForm(id, form);
        if (form) {
            res.json(form);
            return;
        }
        res.json({message: "Form not found"});
    }

    function deleteFormById(req, res) {
        var id = req.params._id;
        form = model.deleteForm(id);
        if (form) {
            res.send(200);
            return;
        }
        res.json({message: "Form not found"});
    }

}