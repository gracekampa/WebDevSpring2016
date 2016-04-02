/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", fieldsController);

    function fieldsController($routeParams, FormService, $rootScope, $scope, $location, FieldService) {

        var vm = this;
        var formId = $routeParams.formId;
        var currentUser = $rootScope.currentUser;

        vm.newField = null;
        vm.editField = editField;
        vm.updateField = updateField;
        vm.deleteField = deleteField;
        vm.addField = addField;
        vm.sort = sort;
        vm.options =
            [
                'Single Line Text Field',
                'Multi Line Text Field',
                'Date Field',
                'Dropdown Field',
                'Checkboxes Field',
                'Radio Buttons Field'
            ];
        vm.fieldOptions = null;

        var optionMap =
            [
                {key: "Single Line Text Field", value: "TEXT"},
                {key: "Multi Line Text Field", value: "TEXTAREA"},
                {key: "Date Field", value: "DATE"},
                {key: "Dropdown Field", value: "OPTIONS"},
                {key: "Checkboxes Field", value: "CHECKBOXES"},
                {key: "Radio Buttons Field", value: "RADIOS"}
            ];

        function init() {
            console.log(formId);
            FormService
                .findFormById(formId)
                .then(function(response){
                    vm.data = response.data;
                });

            FieldService
                .findFieldsByForm(formId)
                .then(function (response) {
                    vm.fields = response.data;
                    vm.newField = null;
                });
        }
        init();


        function sort() {
            vm.form.fields = vm.fields;
            FormService
                .updateFormById(formId, vm.form)
                .then(init);
        }

        function deleteField(field) {
            FieldService
                .deleteField(formId, field._id)
                .then(init);
        }

        function findFieldType(fieldType) {
            for (var k in optionMap) {
                if (optionMap[k].key == fieldType){
                    return optionMap[k].value;
                }
            }
        }

        function addField(fieldType) {
            var field = {"label": "", "type": findFieldType(fieldType), "placeholder": "", "options": null};
            FieldService
                .createField(formId, field)
                .then(init);
        }

        function editField(field) {
            vm.newField = field;

            if (!(vm.newField.type === 'TEXT' || vm.newField.type === 'TEXTAREA')) {
                var optionList = [];
                var newOptions = vm.newField.options;
                for (var option in newOptions) {
                    optionList.push(newOptions[option].label + ":" + newOptions[option].value)
                }
                vm.optionText = optionList.join("\n");
            }
        }

        function updateField(field) {
            vm.newField = field;
            var optionArray = [];

            if (!(field.type == 'TEXT' || field.type == 'TEXTAREA')) {
                var arrayOptions = vm.optionText.split("\n");
                for (var option in arrayOptions) {
                    var arrayOption = arrayOptions[option].split(":");
                    optionArray.push({
                        label: arrayOption[0],
                        value: arrayOption[1]
                    });
                }
                vm.newField.options = optionArray;
            }
            else {
            }
            FieldService
                .updateField(formId, vm.newField._id, vm.newField)
                .then(init);
        }
    }
})();