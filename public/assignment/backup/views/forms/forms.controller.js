/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope) {

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        $scope.forms = FormService.getAllForms();

        function addForm(form) {
            var newForm = {
                title : form.title
            };
            $scope.forms.push(newForm);
            //
            //var newForm = FormService.createFormForUser(form.userId, form,
            //function(form) {
            //    $scope.forms.push(form);
            //});
            //$scope.forms.push(newForm);

        }

        function updateForm(form) {
            $scope.forms[$scope.selectedFormIndex] = {
                title: form.title
            }
        };

        function deleteForm(index) {
            $scope.forms.splice(index, 1);
        };


        function selectForm(index) {
            $scope.selectedFormIndex = index;
            $scope.form = {
                title: $scope.forms[index].title
            };
        };

    }

})();
