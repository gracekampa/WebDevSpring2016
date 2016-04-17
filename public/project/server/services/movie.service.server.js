/**
 * Created by OWNER on 3/22/2016.
 */
module.exports = function(app, movieModel, userModel) {
    app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);
    app.get("/api/project/movie/:imdbID/user", findUserLikes);
    app.post("/api/project/user/:username/movie/:imdbID/review", userAddsReview);

    function findUserLikes (req, res) {
        var imdbID = req.params.imdbID;

        var movie = null;
        movieModel
            .findMovieByImdbID(imdbID)
            .then (
                function (doc) {
                    movie = doc;
                    if (doc) {
                        return userModel.findUsersByIds(movie.likes);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function (users) {
                    //console.log("user added to userLikes");
                    movie.userLikes = users;
                    res.json(movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userLikesMovie(req, res) {
        var movieOmdb  = req.body;
        var userId = req.params.userId;
        var imdbID = req.params.imdbID;
        var movie;
        //console.log("inside movie service");
        //console.log(movieOmdb);
        //console.log(userId);

        movieModel
            .userLikesMovie(userId, movieOmdb)
            // add user to movie likes
            .then(
                function (movie) {
                    return userModel.userLikesMovie(userId, movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userAddsReview(req, res) {
        var movieReview  = req.body;
        //console.log(movieReview);
        var movie = movieReview[2].movie;
        var username = req.params.username;
        var imdbID = req.params.imdbID;
        //console.log("inside movie service");
        //console.log(movieOmdb);
        //console.log(userId);

        movieModel
            .userAddsReview(username, movieReview)
            // add user to movie likes
            .then(
                function (movie) {
                    //return userModel.userAddsReview(username, movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}