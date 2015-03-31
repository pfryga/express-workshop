var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('views', 'views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('cookie-parser')());
app.use(require('express-session')({
  secret: 'grumpy cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(function(req, res, next) {
  var requestCount = req.session.requestCount || 0;
  req.session.requestCount = requestCount + 1;

  next();
});

require('./app/auth')(app);

app.use(express.static('./public'));

app.listen(8080, function () {
    console.log('server started!');
});
