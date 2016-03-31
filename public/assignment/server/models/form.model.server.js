/**
 * Created by OWNER on 3/22/2016.
 */
var mongoose = require("mongoose");
var q = require("q");
module.exports = function () {
    var FormSchema = require("./form.schema.server.js")();
    var Form = mongoose.model("Form", FormSchema);

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        //findApplicationById: findApplicationById,
        //removeApplication: removeApplication,
        getMongooseModel: getMongooseModel
    };
    return api;

    function getMongooseModel() {
        return Form;
    }

    //function removeApplication(applicationId) {
    //    return Application.remove().where("_id").equals(applicationId);
    //}
    //
    //function findApplicationById (applicationId) {
    //    return Application.findById (applicationId);
    //}

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        Form
            .find(
                {userId: userId},
                function (err, forms) {
                    if (!err) {
                        deferred.resolve(forms);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function createFormForUser(form, userId) {
        var deferred = q.defer();
        Form.create({title: form.title,
                     userId: userId},
            function (err, form) {
                if (!err) {
                    deferred.resolve(form);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }
};