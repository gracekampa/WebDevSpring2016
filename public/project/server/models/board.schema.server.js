/**
 * Created by OWNER on 4/15/2016.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var MovieSchema = require("./movie.schema.server.js")(mongoose);
    // use mongoose to declare a movie schema
    var BoardSchema = mongoose.Schema({
        userId: String,
        title: String,
        type: String,
        movies: [MovieSchema]
        // store movie documents in this collection
    }, {collection: 'project.board'});

    return BoardSchema;

};