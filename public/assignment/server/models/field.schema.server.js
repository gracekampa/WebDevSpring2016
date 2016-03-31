/**
 * Created by OWNER on 3/31/2016.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    // use mongoose to declare a movie schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {type: String,
               default: "TEXT",
               enum: ["TEXT", "TEXTAREA", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]},
        placeholder: String,
        options: [{ label: String,
                    value: String}]
        // store movie documents in this collection
    }, {collection: 'assignment.field'});

    return FieldSchema;

};