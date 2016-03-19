/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, FormService, $routeParams, $route) {
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;

        var vm = this;
        vm.addField = addField;
        vm.deleteField = deleteField;

        FieldService.findFieldsByFormId(formId);

        function init() {
            FieldService
                .findFieldsByFormId(formId)
                .then(function (response) {
                    if (response.data) {
                        vm.fields = response.data;
                    }
                });

        }

        init();

        function addField(fieldType) {
            var field = null;
            if (fieldType === "Text") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            }
            else if (fieldType === "Textarea") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            }
            else if (fieldType === "Date") {
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};
            }
            else if (fieldType === "Checkboxes") {
                field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
            }
            else if (fieldType === "Options") {
                field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS",
                    "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
            }
            else {
                field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
            }

            FieldService
                .createField(formId, field)
                .then(function(response){
                    if (response.data) {
                        vm.fields = response.data;
                    }
                });
        }

        function deleteField(field) {
            FieldService
                .deleteField(formId, field._id)
                .then(function (response) {
                    if (response.data) {
                        vm.fields = response.data;
                    }
                });
        }
    }
})();