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

router.post('/newavatar', function(req, res) {
  console.log(req.body[0])
  User.findById(req.user.id, function(err, user) {
    user.avatar = req.body[0]
    user.save()
    res.send(user)
  })
})

module.exports = router;
