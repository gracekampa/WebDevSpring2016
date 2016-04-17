/**
 * Created by OWNER on 4/15/2016.
 */
var mongoose = require("mongoose");
var q = require("q");
module.exports = function (db, mongoose) {
    var BoardSchema = require("./board.schema.server.js")();
    var Board = mongoose.model("Board", BoardSchema);

    var api = {
        createBoardForUser: createBoardForUser,
        findAllBoardsForUser: findAllBoardsForUser,
        addMovieToBoard: addMovieToBoard,
        //findFormById: findFormById,
        //updateFormById: updateFormById,
        //removeForm: removeForm,
        getMongooseModel: getMongooseModel
    };
    return api;

    function getMongooseModel() {
        return Board;
    }

    //function removeForm(formId) {
    //    var deferred = q.defer();
    //    Form
    //        .remove (
    //            {_id: formId},
    //            function (err, stats) {
    //                if(!err) {
    //                    deferred.resolve(stats);
    //                } else {
    //                    deferred.reject(err);
    //                }
    //            }
    //        );
    //    return deferred.promise;
    //}
    //
    //
    //function findFormById(formId) {
    //    //return Form.findById (formId);
    //    console.log("inside select model");
    //    var deferred = q.defer();
    //    Form.findById(formId,
    //        function (err, form) {
    //            if (!err) {
    //                deferred.resolve(form);
    //            } else {
    //                deferred.reject(err);
    //            }
    //        });
    //    return deferred.promise;
    //}

    function findAllBoardsForUser(userId) {

        //console.log("inside board model");
        var deferred = q.defer();
        Board
            .find(
                {userId: userId},
                function(err, boards) {
                    if (!err) {
                        deferred.resolve(boards);
                    } else {
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }

    function createBoardForUser(board, userId) {
        var deferred = q.defer();
        Board.create({title: board.title,
                userId: userId},
            function (err, board) {
                if (!err) {
                    deferred.resolve(board);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function addMovieToBoard(boardTitle, movie, userId) {
        var deferred = q.defer();
        //var boardId = Board.find({title: boardTitle}, {userId: userId});

        Board.findOneAndUpdate({title: boardTitle}, {$push: {"movies": movie}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }

    //function updateFormById(formId, newForm) {
    //    var deferred = q.defer();
    //    Form
    //        .update (
    //            {_id: formId},
    //            {$set: newForm},
    //            function (err, stats) {
    //                if (!err) {
    //                    deferred.resolve(stats);
    //                } else {
    //                    deferred.reject(err);
    //                }
    //            }
    //        );
    //    return deferred.promise;
    //}
};