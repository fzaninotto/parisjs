var http    = require('http');
var express = require('express');
var path    = require('path');

var app = module.exports = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/contact', function(req, res) {
  res.render('contact', { });
});

if (!module.parent) {
  http.createServer(app).listen(process.env.PORT || 8082, function() {
    console.log("Express server listening on port " + this.address().port);
  });
}
