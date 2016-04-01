/**
 * Created by OWNER on 3/30/2016.
 */
module.exports = function (app, formModel) {
    app.post   ("/api/user/:userId/form", createFormForUser);
    //app.get    ("/api/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    //app.get    ("/api/form/:formId", findApplicationById);
    app.put    ("/api/assignment/form/:formId", updateFormById);
    app.get    ("/api/assignment/form/:formId", findFormById);
    app.delete ("/api/user/:userId/form/:formId", deleteFormById);
    app.get    ("/api/user/:userId/form", findAllFormsForUser);


    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;

        formModel
            .findAllFormsForUser(userId)
            .then (
                function(forms) {
                    res.json(forms);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var userId = req.params.userId;
        console.log("service server: "+formId);
        formModel
            .removeForm(formId)
            .then(
                function(form) {
                    //res.json(response.result);
                    return formModel.findAllFormsForUser(userId);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormById (req, res) {
        var formId = req.params.formId;
        formModel
            .findFormById(formId)
            .then(
                function(form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormForUser(req, res) {
        var form = req.body;
        var userId = req.params.userId;
        formModel
            .createFormForUser(form, userId)
            .then (
                function(form) {
                    //res.json(form);
                    return formModel.findAllFormsForUser(userId);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(forms){
                    res.json(forms);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function updateFormById(req, res) {
        console.log("Inside User Server");
        //var formId = req.params.formId;
        //console.log(formId);
        var newForm = req.body;
        var formId = newForm._id;
        formModel
            .updateFormById(formId, newForm)
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