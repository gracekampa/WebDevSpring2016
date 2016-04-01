/**
 * Created by OWNER on 3/22/2016.
 */
module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.server.js")(db, mongoose);
    var formModel   = require("./models/form.model.server.js")(db, mongoose);

    var UserService  = require("./services/user.service.server.js") (app, userModel);
    var FormService = require("./services/form.service.server.js") (app, formModel);
}