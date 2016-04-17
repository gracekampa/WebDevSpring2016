/**
 * Created by OWNER on 3/22/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .factory("MovieService", movieService);

    function movieService($http) {
        var api = {
            userLikesMovie: userLikesMovie,
            findUserLikes: findUserLikes,
            userAddsToBoard: userAddsToBoard,
            findAllBoardsForUser: findAllBoardsForUser,
            userAddsReview: userAddsReview

        };
        return api;

        function findUserLikes(imdbID) {
            return $http.get("/api/project/movie/"+imdbID+"/user");
        }

        function userLikesMovie(userId, movie) {
            //console.log(movie);
            return $http.post("/api/project/user/"+userId+"/movie/"+movie.imdbID, movie);
        }

        function userAddsToBoard(userId, movie, board) {
            return $http.post("/api/project/user/"+userId+"/board/"+boardId+"/movie/"+movie.imdbID, movie);
        }

        function findAllBoardsForUser(userId) {
            return $http.get("/api/project/user/" + userId + "/board");
        }

        function userAddsReview(movieReview, username) {
            //console.log(movieReview[2]);
            return $http.post("/api/project/user/"+username+"/movie/"+movieReview[2].movie.imdbID+"/review", movieReview);
        }
    }
})();