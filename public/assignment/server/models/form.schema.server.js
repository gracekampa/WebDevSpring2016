/**
 * Created by OWNER on 3/22/2016.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    // use mongoose to declare a field schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: {type: String, default: "New Form"},
        fields: [FieldSchema],
        created: {type: Date, default: Date.now()},
        updated: {type: Date, default: Date.now()}
        // store movie documents in this collection
    }, {collection: 'assignment.form'});

    return FormSchema;

};