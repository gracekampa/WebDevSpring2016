/**
 * Created by OWNER on 3/2/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, OmdbService, $rootScope, $location, MovieService, BoardService, $scope) {
        //$scope.imdbID = $routeParams.imdbID;
        //
        //OmdbService.findMovieByImdbId($scope.imdbID, render)
        //
        //function render(response) {
        //    $scope.movie = response;
        //}

        var vm = this;
        var imdbID = $routeParams.imdbID;
        var currentUser = $rootScope.currentUser;
        vm.favorite = favorite;
        vm.addToBoard = addToBoard;

        $scope.boardOptions = [];

        // if field type selected is dropdown, checkboxes, or radio buttons, show options box
        $('#newBoardType').on('change', function() {
            if ($(this).children(':selected').hasClass('needsNewBoard')) {
                $('.newBoard').css('display', 'block');
            }
            else {
                $('.newBoard').css('display', 'none');
            }
        });

        function init() {
            //console.log("Details: "+currentUser.username+currentUser.likes);
            //console.log("In Details Controller");
            OmdbService
                .findMovieByImdbId(imdbID)
                .then(function(response){
                    vm.data = response.data;
                });

            MovieService
                .findUserLikes(imdbID)
                .then(function(response){
                    vm.movie = response.data;
                    //console.log(vm.movie);
                });

            BoardService
                .findAllBoardsForUser(currentUser._id)
                .then(function(response){
                    vm.boardOptions = response.data;
                });

            //MovieService
            //    .findUserReviews(imdbID)
            //    .then(function(response){
            //        vm.movie = response.data;
            //    })
        }
        init();

        function favorite(movie) {
            if(currentUser) {
                vm.movie.likes = [];
                vm.movie.likes.push(currentUser);
                MovieService
                    .userLikesMovie(currentUser._id, movie);
                //console.log(currentUser);
            } else {
                $location.url("/login");
            }
        }

        function addToBoard(boardTitle, movie) {
            console.log(boardTitle);
            console.log(movie);
            var field = vm.newField; // starts out null
            $scope.message = null;

            if (boardTitle == null) {
                $scope.message = "Please choose a field type!";
            } else {
                $('#createBoard').modal('hide');
            }

            //var board = {
            //    "label": field.label,
            //    "type": findFieldType(fieldType),
            //    "placeholder": field.placeholder,
            //    "options": field.options
            //};

            BoardService
                .addMovieToBoard(boardTitle, movie, currentUser._id)
                .then(init);

        }
    }
})();