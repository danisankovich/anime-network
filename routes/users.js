var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');


router.get('/allloggedin', function(req, res, next) {
  var currentUserList = []
  User.find({isLoggedIn: true}, function(err, users) {
    users.forEach(function(e) {
      var name = e.username
      var _id = e._id
      currentUserList.push({name, _id})
    })
    res.send(currentUserList)
  })
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

module.exports = router;
