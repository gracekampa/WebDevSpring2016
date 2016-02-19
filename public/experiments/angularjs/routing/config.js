/**
 * Created by OWNER on 2/16/2016.
 */
(function() {
    angular
        .module("MovieApp", [])
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/search:title", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            // the colon directs to specific imdbID which we put in a variable
            .when("/details/:imdbID", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController"
            })
            .otherwise({
                redirectTo: "/home"
            })
    }
})();