/**
 * Created by OWNER on 3/22/2016.
 */
module.exports = function() {

    var mongoose = require("mongoose");

    var FormSchema = require("./form.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String],
        //// imdb ids of movies this user likes
        //likes: [String],
        //// movies this user likes
        //likesMovies: [MovieSchema],
        // collection property sets
        // collection name to 'user'
    }, {collection: 'assignment.user'});
    return UserSchema;
};