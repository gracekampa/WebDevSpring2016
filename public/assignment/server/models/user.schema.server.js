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
        email: [String],
        roles: [String]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'assignment.user'});
    return UserSchema;
};