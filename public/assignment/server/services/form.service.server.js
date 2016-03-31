/**
 * Created by OWNER on 3/30/2016.
 */
module.exports = function (app, formModel) {
    app.post   ("/api/user/:userId/form", createFormForUser);
    app.get    ("/api/user/:username/form", findAllFormsForUser);
    //app.get    ("/api/form/:formId", findApplicationById);
    //app.delete ("/api/form/:formId", deleteFormById);
    app.get    ("/api/user/:userId/form", findAllFormsForUser);

    function findAllFormsForUser(req, res) {
        console.log("Inside form server");
        var userId = req.params.userId;
        formModel
            .findAllFormsForUser(userId)
            .then (
                function(user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    //function deleteFormById(req, res) {
    //    var applicationId = req.params.applicationId;
    //    formModel
    //        .removeApplication(applicationId)
    //        .then(
    //            function(response) {
    //                res.json(response.result);
    //            },
    //            function(err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

    //function findApplicationById (req, res) {
    //    var applicationId = req.params.applicationId;
    //    applicationModel
    //        .findApplicationById(applicationId)
    //        .then(
    //            function(application) {
    //                res.json(application);
    //            },
    //            function(err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

    function createFormForUser(req, res) {
        console.log("Inside addding form server");
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
}