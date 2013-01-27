var http    = require('http');
var express = require('express');
var path    = require('path');

var app = module.exports = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/contact', function(req, res) {
  res.render('contact', { errors: [] });
});

app.post('/contact', function(req, res) {
  var errors = [];
  if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.message) {
    errors.push('Please fill in all the fields');
  }
  if (errors.length > 0) {
    return res.render('contact', { errors: errors });
  }

  // send email
  // ...

  return res.redirect('/message_sent');
});

if (!module.parent) {
  http.createServer(app).listen(process.env.PORT || 8082, function() {
    console.log("Express server listening on port " + this.address().port);
  });
}
