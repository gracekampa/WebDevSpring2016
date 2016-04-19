/**
 * Created by OWNER on 4/16/2016.
 */
(function() {
    angular
        .module("MovieApp")
        .factory("BoardService", BoardService);

    function BoardService($http) {

        var api = {
            createBoardForUser: createBoardForUser,
            findAllBoardsForUser: findAllBoardsForUser,
            addMovieToBoard: addMovieToBoard
            //deleteBoardById: deleteBoardById,
            //updateFormById: updateFormById,
            //findBoardById: findBoardById

        };
        return api;

        //function  deleteBoardById(user, board) {
        //    //console.log("client"+form.title);
        //    return $http.delete("/api/project/user/"+user._id+"/board/"+board._id);
        //    //return $http.delete ("/api/form/"+form._id);
        //}

        //function updateFormById(formId, newForm) {
        //    return $http.put("/api/assignment/form/"+formId, newForm);
        //}

        function findAllBoardsForUser(userId) {
            //console.log("inside board client"+userId);
            return $http.get("/api/project/user/" + userId + "/board");
        }

        function createBoardForUser(board, user) {
            //console.log("form client:"+form);
            return $http.post("/api/user/" + user._id + "/board", board);
        }

        function addMovieToBoard(boardTitle, movie, userId) {
            console.log(movie);
            return $http.post("/api/user/"+userId+"/board/"+boardTitle+"/movie/"+movie.title, movie) ;
        }

        //function findFormById(boardId) {
        //    console.log("inside select client");
        //    return $http.get("/api/project/board/" + boardId, boardId);
        //}
    }
})();