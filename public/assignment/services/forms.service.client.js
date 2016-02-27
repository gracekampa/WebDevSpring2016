/**
 * Created by OWNER on 2/25/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var services = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234},
            ],

            getAllForms: getAllForms,
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById

        };
        return services;

        function getAllForms() {
            return services.forms;
        }

            function createFormForUser(userId, form, callback) {
                var newForm = {
                     _id: "id:" + (new Date()).getTime(),
                     title: form.title,
                     userId: userId
                };

                services.forms.push(newForm);
                callback(newForm);
                return newForm;
            }

            function findAllFormsForUser(userId, callback) {
                var formArray = [];

                for (var i in services.forms) {
                    if (userId == services.forms[i]._id) {
                        formArray.push(services.forms[i]);
                    }
                }

                callback(formArray);

            }

            function deleteFormById(formId, callback) {
                for (var i in services.forms) {
                    if (services.forms[i]._id === formId) {
                        services.forms.splice(i, 1);
                    }
                }
                callback(services.forms);
            }

            function updateFormById(formId, newForm, callback) {
                var form = services.findFormById(formId);
                if (form != null) {
                    form._id = newForm._id;
                    form.title = newForm.title;
                    form.userId = newForm.userId;
                    callback(form);
                } else {
                    return null;
                }
            }

        function findFormById (formId) {
            for (var i in services.forms) {
                if (services.forms[i]._id === formId) {
                    return services.forms[i];
                }
            }
            return null;
        }
    }
})();