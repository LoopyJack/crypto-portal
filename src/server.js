var server = require('http').createServer();
var express = require('express');
var app = express();
var url = require('url');


var port = 80;


app.get('/', function(req, res, next) {
  let ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress
  console.log('Connection from:', ip);
  console.log(req.get('User-Agent'));
  next();
});

// app.use(express.static('./public'));
app.use(express.static('../dist'));


process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});

server.on('request', app);

server.on('error', function(err) {
  console.log(err);
});

server.listen(port, function () {
  console.log('Listening on http://localhost:' + port);
});
