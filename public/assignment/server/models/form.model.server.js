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
        findFormById: findFormById,
        removeForm: removeForm,
        getMongooseModel: getMongooseModel
    };
    return api;

    function getMongooseModel() {
        return Form;
    }

    function removeForm(formId) {
        return Form.remove().where("_id").equals(formId);
    }


    function findFormById (formId) {
        //return Form.findById (formId);

        var deferred = q.defer();
        Form.findById(formId,
            function (err, form) {
                if (!err) {
                    deferred.resolve(form);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function findAllFormsForUser(userId) {

        var deferred = q.defer();
        Form
            .find(
                {userId: userId},
                function(err, forms) {
                    if (!err) {
                        deferred.resolve(forms);
                    } else {
                        deferred.reject(err);
                    }
                });
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

    function updateFormById(formId, newForm) {
        var deferred = q.defer();
        Form
            .update (
                {_id: formId},
                {$set: newForm},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }
};