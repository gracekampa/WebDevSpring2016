/**
 * Created by OWNER on 3/22/2016.
 */
module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.server.js")(db, mongoose);
    var movieModel   = require("./models/movie.model.server.js")(db, mongoose);
    var boardModel   = require("./models/board.model.server.js")(db, mongoose);
    var reviewModel   = require("./models/review.model.server.js")(db, mongoose);

    var userService  = require("./services/user.service.server.js") (app, movieModel, userModel);
    var movieService = require("./services/movie.service.server.js")(app, movieModel, userModel, reviewModel);
    var boardService = require("./services/board.service.server.js")(app, boardModel, movieModel, userModel);
    //var reviewService = require("./services/review.service.server.js")(app, reviewModel, movieModel, userModel);
}