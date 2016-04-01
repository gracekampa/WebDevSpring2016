/**
 * Created by OWNER on 2/25/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {

        var api = {
            //forms: [
            //    {"_id": "000", "title": "Contacts", "userId": 123},
            //    {"_id": "010", "title": "ToDo",     "userId": 123},
            //    {"_id": "020", "title": "CDs",      "userId": 234},
            //],

            //getAllForms: getAllForms,
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById

        };
        return api;

        function  deleteFormById(user, form) {
            console.log("client"+form.title);
            return $http.delete("/api/user/"+user._id+"/form/"+form._id);
            //return $http.delete ("/api/form/"+form._id);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/"+formId, newForm);
        }

        //function updateFormById(form) {
        //    return $http.put("/api/form/"+form._id, form);
        //}

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function createFormForUser(form, user) {
            console.log("form client:"+form);
            return $http.post("/api/user/" + user._id + "/form", form);
        }

        function findFormById(formId) {
            return $http.get("/api/assignment/form/" + formId);
        }

        //function getAllForms() {
        //    return api.forms;
        //}

        //function createFormForUser(userId, form, callback) {
        //    var newForm = {
        //        _id: "id:" + (new Date()).getTime(),
        //        title: form.title,
        //        userId: userId
        //    };
        //
        //    services.forms.push(newForm);
        //    callback(newForm);
        //    return newForm;
        //}
        //
        //function findAllFormsForUser(userId, callback) {
        //    var formArray = [];
        //
        //    for (var i in services.forms) {
        //        if (userId == services.forms[i]._id) {
        //            formArray.push(services.forms[i]);
        //        }
        //    }
        //
        //    callback(formArray);
        //
        //}
        //
        //function deleteFormById(formId, callback) {
        //    for (var i in services.forms) {
        //        if (services.forms[i]._id === formId) {
        //            services.forms.splice(i, 1);
        //        }
        //    }
        //    callback(services.forms);
        //}
        //
        //function updateFormById(formId, newForm, callback) {
        //    var form = services.findFormById(formId);
        //    if (form != null) {
        //        form._id = newForm._id;
        //        form.title = newForm.title;
        //        form.userId = newForm.userId;
        //        callback(form);
        //    } else {
        //        return null;
        //    }
        //}
        //
        //function findFormById (formId) {
        //    //for (var i in services.forms) {
        //    //    if (services.forms[i]._id === formId) {
        //    //        return services.forms[i];
        //    //    }
        //    //}
        //    //return null;
        //
        //    return $http.post("/api/assignment/user", credentials);
        //}
    }
})();