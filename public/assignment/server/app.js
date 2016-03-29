/**
 * Created by OWNER on 3/10/2016.
 */
module.exports = function (db, mongoose, app) {
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var formModel = require("./models/form.model.server.js")(db, mongoose);
    //var fieldModel = require("./models/field.model.server.js")();

    var userService = require("./services/user.service.server.js")(app, formModel, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
};