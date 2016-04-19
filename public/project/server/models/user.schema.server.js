/**
 * Created by OWNER on 3/22/2016.
 */
module.exports = function() {

    var mongoose = require("mongoose");

    var MovieSchema = require("./movie.schema.server.js")(mongoose);
    var BoardSchema = require("./board.schema.server.js")(mongoose);
    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String],
        // imdb ids of movies this user likes
        likes: [String],
        // movies this user likes
        likesMovies: [MovieSchema],
        reviewsMovies: [ReviewSchema],
        boards: [BoardSchema]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.omdb.user'});
    return UserSchema;
};