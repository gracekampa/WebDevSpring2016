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
        var form = req.body;
        model.createForm(userId, form);
        res.send(200);
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
        var id = req.params.formId;
        var form = model.findFormById(id);
        if (form) {
            res.json(form);
            return;
        }
        res.json({message: "Form not found"});
    }


    function updateFormById(req, res) {
        var id = req.params.formId;
        var form = req.body;
        form = model.updateForm(id, form);
        if (form) {
            res.json(form);
            return;
        }
        res.json({message: "Form not found"});
    }

    function deleteFormById(req, res) {
        var id = req.params.formId;
        form = model.deleteForm(id);
        if (form) {
            res.send(200);
            return;
        }
        res.json({message: "Form not found"});
    }

}