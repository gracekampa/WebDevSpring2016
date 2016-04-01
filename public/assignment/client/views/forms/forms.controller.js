/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope, $routeParams) {

        var vm = this;
        //$scope.forms = {};
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        vm.currentUser = $rootScope.currentUser;

        $scope.form = {};

        function init() {
            FormService
                .findAllFormsForUser(vm.currentUser._id)
                .then(
                    function(response) {
                        if (response.data) {
                            vm.forms = response.data;
                        }
                    });
        }
        init();


        function addForm(form) {
            var user = $rootScope.currentUser;
            FormService
                .createFormForUser(form, user)
                .then (
                    function(response) {
                        vm.forms = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );

        };

        //function updateForm(form) {
        //    $scope.forms[$scope.selectedFormIndex] = {
        //        title: form.title
        //    }
        //};

        function updateForm(form) {
            FormService
                .updateFormById(form._id, form)
                .then(
                    function(response) {
                        if (response.data) {
                            vm.form = response.data;
                            //$scope.message = "User updated successfully";
                            //console.log(vm.message);
                            //UserService.setCurrentUser(vm.currentUser);
                        }
                    },
                    function (err) {
                        vm.error = err;
                        //$scope.error = "Unable to update the user";
                        return;
                    }
                );
        }

        function deleteForm(form) {
            var user = $rootScope.currentUser;
            console.log(form);
            FormService
                .deleteFormById(user, form)
                .then (
                    function(response) {
                        console.log(response.data);
                        vm.forms = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );

            //$scope.forms.splice(index, 1);
        };


        function selectForm(form) {
            FormService
                .findFormById(form._id)
                .then(
                    function(response) {
                        //$scope.form = response.data;
                        //vm.form = {title: form.title};
                        vm.form = form;
                        vm.form.title = form.title;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );

            //$scope.selectedFormIndex = index;
            //$scope.form = {
            //    title: $scope.forms[index].title
            //};
        };

    }

})();
