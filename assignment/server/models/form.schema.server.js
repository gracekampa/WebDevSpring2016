/**
 * Created by OWNER on 3/22/2016.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    // use mongoose to declare a movie schema
    var FormSchema = mongoose.Schema({
        _id: String,
        title: String,
        userId: String,
        // ids of users that like this movie
        //likes: [String],
        // list of users that like this movie
        //userLikes: [
        //    {username: String}
        //],
        // store movie documents in this collection
    }, {collection: 'assignment.form'});

    return FormSchema;

};