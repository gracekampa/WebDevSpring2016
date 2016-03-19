/**
 * Created by OWNER on 3/17/2016.
 */
var mock = require("./form.mock.json");

module.exports = function(db, app) {
    var api = {
        createForm: createForm,
        findFormById: findFormById,
        findFormByUserId: findFormByUserId,
        findAllForms: findAllForms,
        updateFormById: updateFormById,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle
    };
    return api;

    function createForm(userId, form) {
        var newForm = {
            _id: "id:" + (new Date()).getTime(),
            title: form.title,
            userId: userId,
            fields: []
        };

        mock.push(newForm);
        return mock;
    }

    function updateFormById(formId, newForm) {
        var form = findFormById(formId);
        if (form != null) {
            form._id = newForm._id;
            form.title = newForm.title;
            form.userId = newForm.userId;
        } else {
            return null;
        }
    }

    function findAllForms () {
        return mock;
    }

    function findFormById(formId) {
        for (var i in mock) {
            if (mock[i]._id === formId) {
                return mock[i];
            }
        }
        return null;
    }

    function findFormByUserId(userId) {
        for (var i in mock) {
            if (mock[i].userId === userId) {
                return mock[i];
            }
        }
        return null;
    }

    function deleteForm (formId) {
        var form = findFormById(formId);
        var idx = mock.indexOf(form);
        mock.splice(idx, 1);
        return mock;
    }

    function findFormByTitle(title) {
        for(var i=0; i<mock.length; i++) {
            if(mock[i].title == title) {
                return mock[i];
            }
        }
    }
}