/**
 * Created by OWNER on 3/2/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("DetailsController", detailsController)
        .directive('starRating', starRating);

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
        $scope.rating = 1;
        vm.rating = 1;
        vm.review = "";
        $scope.rateMovie = function(rating) {
            alert('Rating selected - ' + rating);
            vm.rating = rating;
        };

        vm.favorite = favorite;
        vm.addToBoard = addToBoard;
        vm.addReview = addReview;

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
                    vm.movie = response.data;
                });

            //MovieService
            //    .findUserLikes(imdbID)
            //    .then(function(response){
            //        vm.movie = response.data;
            //        //console.log(vm.movie);
            //    });
            console.log(currentUser.likes.indexOf(imdbID));
            console.log(imdbID);

            MovieService
                .findAllReviewsForMovie(imdbID)
                .then(
                    function(response) {
                        if (response.data) {
                            vm.reviews = response.data;
                            console.log(vm.reviews);
                        }
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
                movie.likes = [];
                movie.likes.push(currentUser);
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

        function addReview(imdbID, review, rating) {
            vm.review = review;
            vm.rating = rating;
            console.log(review);
            console.log(rating);
            console.log(imdbID);
            var user = currentUser;
            var movieReview = {username: user.username, review: review, rating: rating, imdbID: imdbID};
            //console.log(movieReview);

            MovieService
                .userAddsReview(movieReview)
                .then(init);

        }
    }

    function starRating() {
        return {
            restrict: 'A',
            template: '<ul class="rating">'
            + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
            + '\u2605'
            + '</li>'
            + '</ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {
                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function (index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue',
                    function (oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );
            }
        };
    }
})();