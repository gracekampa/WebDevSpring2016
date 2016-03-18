var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// for first setup of dev environment "hello world" page
app.get('/hello', function(req, res){
    res.send('hello world');
});

app.listen(port, ipaddress);

require("./public/assignment/server/app.js")(app);