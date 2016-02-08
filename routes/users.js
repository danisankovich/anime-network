var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

router.get('/', function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) { res.send(err);}
    else {
      user.isLoggedIn = true;
      user.save()
      res.json(req.user);
    }
  });
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) { res.send(err);}
    else { res.json(user);}
  });
});

router.get('/username/:id', function(req, res, next) {
  User.find({username: req.params.id}, function(err, user) {
    if (err) { res.send(err);}
    else {
      var newUser = {}
      newUser.username = user[0].username
      newUser._id = user[0]._id
      res.send(newUser);
    }
  });
});

router.post('/newavatar', function(req, res) {
  console.log(req.body[0])
  User.findById(req.user.id, function(err, user) {
    user.avatar = req.body[0]
    user.save()
    res.send(user)
  })
})

router.get('/register', function(req, res) { });

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username, email: req.body.email}),
  req.body.password, function(err, user) {
    if (err) { res.send(err); }
    passport.authenticate('local')(req, res, function() { res.redirect('/#/'); });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  req.session.save(function (err, user) {
    if (err) { res.send(err); }
    // if (err) { return next(err); }
    res.send()
  });
});
router.get('/userleave/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) { res.send(err);}
    else {
      user.isLoggedIn = false;
      user.save()
      res.json(req.user);
    }
  });
});

module.exports = router;
