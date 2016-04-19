/**
 * Created by OWNER on 3/22/2016.
 */
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db) {
    var mongoose = require("mongoose");

    // load movie schema from movie model
    var MovieSchema = require("./movie.schema.server.js")(mongoose);

    // create movie from schema
    var Movie  = mongoose.model("Movie", MovieSchema);

    var movies = [];
    var api = {
        findMovieByImdbID: findMovieByImdbID,
        findMoviesByImdbIDs: findMoviesByImdbIDs,
        createMovie: createMovie,
        userLikesMovie: userLikesMovie,
        userAddsReview: userAddsReview
    };
    return api;

    function userAddsReview(username, movieReview) {
        var movie = movieReview[2].movie;
        var review = [
            {username: username},
            {review: movieReview[0].review},
            {rating: movieReview[1].rating.toString()}
        ];
        review.username = username;
        review.review = movieReview[0].review;
        review.rating = movieReview[1].rating;
        console.log(review);
        var deferred = q.defer();

        //Movie.findOneAndUpdate({imdbID: movie.imdbID}, { $push: { userReviews: review },
        //
        //)

        //Movie.update({imdbID: movie.imdbID}, { $push: { userReviews: review }});

        Movie.findByIdAndUpdate(movie._id, {$push: { "userReviews":
                            {username: review.username,
                             review: review.review,
                             rating: review.rating}
                    }}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc)
            }
        });

        //Movie.update({imdbID: movie.imdbID},
        //    { $push:
        //        { userReviews: [
        //                {username: username},
        //                {review: movieReview[0].review},
        //                {rating: movieReview[1].rating}
        //                        ]
        //        }
        //    });

        // find the movie by imdb ID
        //Movie.findOne({imdbID: movie.imdbID},
        //
        //    function (err, doc) {
        //
        //        // reject promise if error
        //        if (err) {
        //            deferred.reject(err);
        //        }
        //
        //        // if there's a movie
        //        if (doc) {
        //            // add user to likes
        //            doc.userReviews.push([
        //                {username: username},
        //                {review: movieReview[0].review},
        //                {rating: movieReview[1].rating.toString()}
        //            ]);
        //            // save changes
        //            doc.save(function(err, doc){
        //                if (err) {
        //                    deferred.reject(err);
        //                } else {
        //                    deferred.resolve(doc);
        //                }
        //            });
        //        } else {
        //            // if there's no movie
        //            // create a new instance
        //            movie = new Movie({
        //                imdbID: movie.imdbID,
        //                title: movie.Title,
        //                poster: movie.Poster,
        //                userReviews: []
        //            });
        //            // add user to likes
        //            movie.userReviews.push(review);
        //            // save new instance
        //            movie.save(function(err, doc) {
        //                if (err) {
        //                    deferred.reject(err);
        //                } else {
        //                    deferred.resolve(doc);
        //                }
        //            });
        //        }
        //    });

        return deferred.promise;
    }

    function userLikesMovie (userId, movie) {

        var deferred = q.defer();

        // find the movie by imdb ID
        Movie.findOne({imdbID: movie.imdbID},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's a movie
                if (doc) {
                    // add user to likes
                    doc.likes.push (userId);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no movie
                    // create a new instance
                    movie = new Movie({
                        imdbID: movie.imdbID,
                        title: movie.Title,
                        poster: movie.Poster,
                        likes: []
                    });
                    // add user to likes
                    movie.likes.push(userId);
                    // save new instance
                    movie.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function findMoviesByImdbIDs(imdbIDs) {

        var deferred = q.defer();

        // find all movies
        // whose imdb IDs
        // are in imdbIDs array
        Movie.find({
            imdbID: {$in: imdbIDs}
        }, function (err, movies) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(movies);
            }
        })
        return deferred.promise;
    }

    function createMovie(movie) {

        // create instance of movie
        var movie = new Movie({
            imdbID: movie.imdbID,
            poster: movie.Poster,
            title: movie.Title,
            likes: []
        });

        var deferred = q.defer();

        // save movie to database
        movie.save(function (err, doc) {

            if (err) {
                // reject promise if error
                defferred.reject(err)
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findMovieByImdbID(imdbID) {

        var deferred = q.defer();

        Movie.findOne({imdbID: imdbID}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
}