/**
 * Created by OWNER on 3/18/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {
        var api = {
            createField: createField,
            findField: findField,
            findFieldsByFormId: findFieldsByFormId,
            deleteField: deleteField,
            updateField: updateField
        };
        return api;

        function createField(formId, field) {
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function findField(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function findFieldsByFormId(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field")
        }

        function deleteField(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }
    }
})