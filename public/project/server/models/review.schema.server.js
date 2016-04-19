/**
 * Created by OWNER on 4/18/2016.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    //var MovieSchema = require("./movie.schema.server.js")(mongoose);
    // use mongoose to declare a movie schema
    var ReviewSchema = mongoose.Schema({
        username: String,
        review: String,
        rating: String,
        imdbID: String
        // store movie documents in this collection
    }, {collection: 'project.review'});

    return ReviewSchema;

};