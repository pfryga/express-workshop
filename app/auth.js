var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config');

passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
  done(null, JSON.parse(user));
});

passport.use(new LocalStrategy(function(username, password, done) {
  return done(null, {
    username: username,
    password: password
  });
}));

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: 'http://localhost:8080/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  app.route('/login')
    .get(function(req, res) {
      res.render('login', { 'user': req.user });
    })
    .post(
      passport.authenticate('local'),
      function(req, res) {
        res.redirect('/login');
      }
    );

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/auth/facebook/success',
      failureRedirect: '/login'
    }));

  app.get('/auth/facebook/success', function(req, res) {
    res.render('facebookSuccess');
  });

  app.post('/logout', function(req, res) {

    req.logout();
    res.redirect('/login');

  });
};
