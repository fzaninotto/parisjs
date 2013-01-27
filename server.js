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
  var options = {
    first_name: '',
    last_name: '',
    email: '',
    message: '',
    errors: []
  };
  res.render('contact', options);
});

app.post('/contact', function(req, res) {
  var options = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    message: req.body.message,
    errors: []
  };
  if (!options.first_name || !options.last_name || !options.email || !options.message) {
    options.errors.push('Please fill in all the fields');
  }
  if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(options.email)) {
    options.errors.push('Please check the email address format');
  }
  if (options.errors.length > 0) {
    return res.render('contact', options);
  }

  // send email
  // ...

  return res.redirect('/message_sent');
});

app.get('/message_sent', function(req, res) {
  res.render('message_sent');
});

if (!module.parent) {
  http.createServer(app).listen(process.env.PORT || 8082, function() {
    console.log("Express server listening on port " + this.address().port);
  });
}
