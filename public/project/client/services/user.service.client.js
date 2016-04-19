/**
 * Created by OWNER on 2/23/2016.
 */

(function(){
    angular
        .module("MovieApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        //var api = {
        //    findUserByCredentials: findUserByCredentials,
        //    login: login,
        //    setCurrentUser: setCurrentUser,
        //    getCurrentUser: getCurrentUser,
        //    register: register,
        //    logout: logout,
        //    getProfile: getProfile,
        //    updateUser: updateUser
        //};
        //return api;
        //
        //function findUserByCredentials(credentials) {
        //    return $http.post("/api/project/user", credentials);
        //}
        //
        //function getProfile() {
        //    return $http.get("/api/project/profile/"+$rootScope.currentUser._id);
        //}
        //
        //function register(user) {
        //    return $http.post("/api/project/register", user);
        //}
        //
        //function logout() {
        //    return $http.post("/api/project/logout");
        //}
        //
        //function getCurrentUser() {
        //    return $http.get("/api/project/loggedin");
        //}
        //
        //function setCurrentUser(user) {
        //    $rootScope.currentUser = user;
        //}
        //
        //function login(credentials) {
        //    console.log('Inside login client');
        //    return $http.post("/api/project/login", credentials);
        //}
        //
        //function updateUser (user) {
        //    return $http.put("/api/project/user/"+user.username, user);
        //}
        var api = {
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            login: login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            register: register,
            logout: logout,
            getProfile: getProfile,
            deleteUser: deleteUser,
            updateUser: updateUser,
            updateUserAdmin: updateUserAdmin,
            createUser: createUser
        };
        return api;

        function findAllUsers() {
            return $http.get("/api/project/admin/user");
        }

        function findUserById(userId) {
            return $http.get("/api/project/admin/user/" + userId, userId);
        }

        function findUserByCredentials(credentials) {
            //return $http.post("/api/project/user", credentials);
            return $http.get("/api/project/user", credentials);
        }

        function getProfile() {
            return $http.get("/api/project/profile/"+$rootScope.currentUser._id);
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function login(credentials) {
            console.log('Inside login client');
            return $http.post("/api/project/login", credentials);
        }

        function updateUser(user) {
            return $http.put("/api/project/user/"+user.username, user);
        }

        function updateUserAdmin(userId, user) {
            console.log(user);
            return $http.put("/api/project/admin/user/"+userId, user);
        }

        function createUser(user) {
            return $http.post('/api/project/admin/user', user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/project/admin/user/'+userId);
        }
    }
})();