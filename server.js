//var express = require('express');
//var app = express();
//var bodyParser = require('body-parser');
//var multer = require('multer');
//// install and require the mongoose library
//var mongoose = require('mongoose');
//
//// create a default connection string
//var connectionString = 'mongodb://127.0.0.1:27017/cs4550';
//
//// use remote connection string
//// if running in remote server
//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//        process.env.OPENSHIFT_APP_NAME;
//}
//
//// connect to the database
//var db = mongoose.connect(connectionString);
//
//var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer());
//app.use(express.cookieParser());
//app.use(express.session({secret: '1234567890QWERTY'}));
//
//app.use(express.static(__dirname + '/public'));
//
//require("./public/assignment/server/app.js")(app, db, mongoose);
//
//// pass db and mongoose reference to server side application module
//require("./public/project/server/app.js")(app, db, mongoose);
//
//// for first setup of dev environment "hello world" page
//app.get('/hello', function(req, res){
//    res.send('hello world');
//});
//
//app.listen(port, ipaddress);
//
//require("./public/assignment/server/app.js")(app);

var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var multer      = require('multer');
var mongoose    = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/cs4550';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

var ipaddress   = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port        = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));


app.use(express.static(__dirname + '/public'));

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app, db, mongoose);
//require("./public/omdb/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);