/**
 * Created by OWNER on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/courses", {
                templateUrl: "courses.html",
                controller: "CourseController"
            })
            .when("/courseEdit/:count", {
                templateUrl: "courseEdit.html",
                controller: "CourseEditController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();