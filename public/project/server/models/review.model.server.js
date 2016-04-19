/**
 * Created by OWNER on 4/18/2016.
 */
var mongoose = require("mongoose");
var q = require("q");
module.exports = function (db, mongoose) {
    var ReviewSchema = require("./review.schema.server.js")();
    var Review = mongoose.model("Review", ReviewSchema);

    var api = {
        createReviewForMovie: createReviewForMovie,
        findAllReviewsForMovie: findAllReviewsForMovie,
        //addMovieToBoard: addMovieToBoard,
        //findFormById: findFormById,
        //updateFormById: updateFormById,
        //removeForm: removeForm,
        getMongooseModel: getMongooseModel
    };
    return api;

    function getMongooseModel() {
        return Review;
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

    function findAllReviewsForMovie(movieId) {

        //console.log("inside board model");
        var deferred = q.defer();
        Review
            .find(
                {imdbID: movieId},
                function(err, reviews) {
                    if (!err) {
                        deferred.resolve(reviews);
                    } else {
                        deferred.reject(err);
                    }
                });
        return deferred.promise;
    }

    function createReviewForMovie(movieReview) {
        var deferred = q.defer();
        Review.create(movieReview,
            function (err, board) {
                if (!err) {
                    deferred.resolve(board);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    //function addMovieToBoard(boardTitle, movie, userId) {
    //    var deferred = q.defer();
    //    //var boardId = Board.find({title: boardTitle}, {userId: userId});
    //
    //    Board.findOneAndUpdate({title: boardTitle}, {$push: {"movies": movie}}, {new: true}, function (err, doc) {
    //        if (err) {
    //            deferred.reject(err);
    //        }
    //        else {
    //            deferred.resolve(doc)
    //        }
    //    });
    //    return deferred.promise;
    //}
};