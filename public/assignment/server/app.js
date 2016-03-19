/**
 * Created by OWNER on 3/10/2016.
 */
module.exports = function (app) {
    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")();
    var fieldModel = require("./models/field.model.js")();

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel, fieldModel);
};