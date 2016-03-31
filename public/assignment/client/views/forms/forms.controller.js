/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope, $routeParams) {

        var vm = this;
        vm.forms = null;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        function init () {
            console.log("Inside form controller");
            console.log($rootScope.currentUser);
            FormService
                .findAllFormsForUser($rootScope.currentUser)
                .then(
                    function(response) {
                        vm.forms = response.data;
                        console.log("forms:"+vm.forms);
                    },
                    function (err) {
                        vm.error = err;
                    }
                )
        }
        init ();

        function addForm(form) {
            console.log(form);
            var user = $rootScope.currentUser;
            FormService
                .createFormForUser(form, user)
                .then (
                    function(response) {
                        //$location.url("/user/"+user.username+"/form");
                        //vm.forms.push(form);
                        vm.forms = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );


            //var newForm = {
            //    title : form.title
            //};
            //$scope.forms.push(newForm);
            //
            //var newForm = FormService.createFormForUser(form.userId, form,
            //function(form) {
            //    $scope.forms.push(form);
            //});
            //$scope.forms.push(newForm);

        };

        function updateForm(form) {
            $scope.forms[$scope.selectedFormIndex] = {
                title: form.title
            }
        };

        function deleteForm(index) {
            var user = $rootScope.currentUser;
            FormService
                .createFormForUser(form, user)
                .then (
                    function(form) {
                        //$location.url("/user/"+user.username+"/form");
                        vm.forms.push(form);
                    },
                    function(err) {
                        vm.error = err;
                    }
                );

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
