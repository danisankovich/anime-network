var express = require('express');
var router = express.Router();
var passport = require('passport');
var logout = require('express-passport-logout');
var User = require('../models/user');
var unirest = require('unirest');

router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
  res.send();
});

router.get('/user', function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) {
      console.error(err);
    }
    else {
      res.json(req.user);
    }
  });
});

router.get('/anime', function(req, res, next) {
  unirest.get("https://hummingbirdv1.p.mashape.com/anime/steins-gate")
  .header("X-Mashape-Key", "fL30UnxVmgmsh80IDMvD28obwFSup1Fv6mNjsnjhuV3M9VbB2R")
  .header("Accept", "application/json")
  .end(function (result) {
    console.log("statusasfsdfa", result.status);
    console.log("headersrsdsfasdf", result.headers);
    console.log('Bodydajgsdlgjsdlgj', result.body);
    res.send(result.body);
  });
});

router.get('/register', function(req, res) {

});

router.post('/register', function(req, res) {
  User.register(new User({
    username: req.body.username, email: req.body.email}),
    req.body.password, function(err, user) {
      if (err) {
        res.send(err);
      }
      passport.authenticate('local')(req, res, function() {
        res.redirect('/#/');
      });
  });
});

router.get('/login', function(req, res) {

});

// router.post('/login', passport.authenticate('local'), function(req, res) {
//   res.redirect('/');
// });
router.post('/login', passport.authenticate('local', { failureRedirect: '/#/login2' }), function(req, res, next) {
req.session.save(function (err) {
if (err) {
return next(err);
}
res.redirect('/');
});
});

module.exports = router;
