/**
 * Created by OWNER on 3/31/2016.
 */
var mongoose = require("mongoose");
var q = require("q");
module.exports = function () {
    var FieldSchema = require("./field.schema.server.js")();
    var Field = mongoose.model("Field", FieldSchema);

    var FormSchema = require("./form.schema.server.js")();
    var Form = mongoose.model("FormField", FormSchema);

    var api = {
        getMongooseModel: getMongooseModel,
        createField: createField,
        deleteField: deleteField,
        findField: findField,
        updateField: updateField,
        findFieldsByFormId: findFieldsByFormId,
        sortField: sortField
    };
    return api;

    function getMongooseModel() {
        return Field;
    }

    function sortField(formId, startIndex, endIndex) {

        return Form
            .findById(formId)
            .then(
                function(form) {

                    form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);

                    form.markModified("fields"); // notify mongoose fields have changed

                    form.save();
                }
            );
    }

    function createField(formId, field) {
        var deferred = q.defer();

        Form.findByIdAndUpdate(formId, {$push: {"fields": field}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }

    function deleteField(formId, fieldId) {
        var deferred = q.defer();

        Form.findByIdAndUpdate(formId, {
                $pull: {fields:
                {_id: fieldId}
                }},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findField(formId, fieldId) {
        var deferred = q.defer();

        Form.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                for (field in doc.fields) {
                    if (doc.fields[field]._id === fieldId) {
                        deferred.resolve(doc.fields[field]);
                        return deferred.promise;
                    }
                }
                deferred.reject("Couldn't find field");
            }
        });
        return deferred.promise;
    }

    function findFieldsByFormId(formId) {
        var deferred = q.defer();

        Form.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc.fields);
            }
        });

        return deferred.promise;
    }

    function updateField(formId, field) {
        var deferred = q.defer();

        Form.update({_id: formId, "fields._id" : field._id}, {$set: {"fields.$": field}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                console.log(doc);
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }
};