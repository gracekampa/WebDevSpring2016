/**
 * Created by OWNER on 2/25/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById

        };
        return api;

        function  deleteFormById(user, form) {
            console.log("client"+form.title);
            return $http.delete("/api/assignment/user/"+user._id+"/form/"+form._id);
            //return $http.delete ("/api/form/"+form._id);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/"+formId, newForm);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function createFormForUser(form, user) {
            console.log("form client:"+form);
            return $http.post("/api/user/" + user._id + "/form", form);
        }

        function findFormById(formId) {
            console.log("inside select client");
            return $http.get("/api/assignment/form/" + formId, formId);
        }
    }
})();