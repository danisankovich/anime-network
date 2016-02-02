var express = require('express');
var router = express.Router();
var User = require('../models/user');

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

module.exports = router;
