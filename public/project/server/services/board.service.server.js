/**
 * Created by OWNER on 4/16/2016.
 */
module.exports = function (app, boardModel, movieModel, userModel) {
    app.post   ("/api/user/:userId/board", createBoardForUser);
    app.get("/api/project/user/:userId/board", findAllBoardsForUser);
    app.post("/api/user/:userId/board/:boardTitle/movie/:movieId", addMovieToBoard);
    //app.put    ("/api/assignment/form/:formId", updateFormById);
    //app.get    ("/api/assignment/form/:formId", findFormById);
    //app.delete ("/api/assignment/user/:userId/form/:formId", deleteFormById);
    //app.get    ("/api/user/:userId/form", findAllFormsForUser);


    function findAllBoardsForUser(req, res) {
        var userId = req.params.userId;

        boardModel
            .findAllBoardsForUser(userId)
            .then (
                function(boards) {
                    res.json(boards);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    //function deleteFormById(req, res) {
    //    var formId = req.params.formId;
    //    var userId = req.params.userId;
    //    formModel
    //        .removeForm(formId)
    //        .then(
    //            function(form) {
    //                //res.json(response.result);
    //                return formModel.findAllFormsForUser(userId);
    //            },
    //            function(err) {
    //                res.status(400).send(err);
    //            }
    //        )
    //        .then(
    //            function(forms) {
    //                res.json(forms);
    //            },
    //            function(err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

    //function findFormById (req, res) {
    //    var formId = req.params.formId;
    //    formModel
    //        .findFormById(formId)
    //        .then(
    //            function(form) {
    //                res.json(form);
    //            },
    //            function(err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

    function createBoardForUser(req, res) {
        var board = req.body;
        var userId = req.params.userId;
        boardModel
            .createBoardForUser(board, userId)
            .then (
                function(board) {
                    //res.json(form);
                    return boardModel.findAllBoardsForUser(userId);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(boards){
                    res.json(boards);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function addMovieToBoard(req, res) {
        var movie = req.body;
        var userId = req.params.userId;
        var boardTitle = req.params.boardTitle;
        var movieId = req.params.movieId;
        console.log(movie.Title);

        boardModel.addMovieToBoard(boardTitle, movie, userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    //function updateFormById(req, res) {
    //    console.log("Inside User Server");
    //    //var formId = req.params.formId;
    //    //console.log(formId);
    //    var newForm = req.body;
    //    var formId = newForm._id;
    //    formModel
    //        .updateFormById(formId, newForm)
    //        .then(
    //            function(stats) {
    //                res.send(200);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}
}