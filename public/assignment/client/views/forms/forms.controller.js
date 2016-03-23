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
        $scope.getForms = getForms;


        $scope.form = {};

        function getForms() {
            FormService
                .findAllFormsForUser($rootScope.currentUser._id)
                .then(function(response) {
                    if (response.data) {
                        $scope.form = response.data;
                    }
                })
        }
        getForms();

        function addForm(form) {
            FormService
                .createFormForUser(form.userId, form)
                .then(function(response) {
                    if (response.data) {
                        var newForm = {
                            title : form.title
                        };
                        $scope.forms.push(newForm);
                    }
                });
            //function(form) {
            //    $scope.forms.push(form);
            //});
            //$scope.forms.push(newForm);

        }

        function updateForm(form) {
            FormService
                .updateFormById(form._id, form)
                .then(function (response) {
                    if (response.data) {
                        $scope.forms[$scope.selectedFormIndex] = {
                            title: form.title
                        }
                    }
                });
        }

        function deleteForm(index) {
            FormService
                .deleteFormById(form._id)
                .then(function(response) {
                    if (response.data) {
                        $scope.forms.splice(index, 1);
                    }
                })
        };


        function selectForm(index) {
            $scope.selectedFormIndex = index;
            $scope.form = {
                title: $scope.forms[index].title
            };
        };

    }

})();
