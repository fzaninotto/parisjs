var http    = require('http');
var express = require('express');
var path    = require('path');

var app = module.exports = express();

app.use(app.router);

app.get('/contact', function(req, res) {
  res.send('contact');
});

if (!module.parent) {
  http.createServer(app).listen(process.env.PORT || 8082, function() {
    console.log("Express server listening on port " + this.address().port);
  });
}
