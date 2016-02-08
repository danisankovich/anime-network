var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Chat = require('../models/chat');

router.get('/', function(req, res, next) {
  Chat.find({}, function(err, chats) {
    if (err) { res.send(err);}
    if(chats.length === 0) {
      Chat.create({
        messages: []
      }, function(err, chat) {
        res.send(chat)
      })
    }
    else {
      if(chats[0].messages.length > 50 ) {
        chats = chats[0].messages.slice(-50)
        console.log(chats)
        res.send(chats)
      }
      else {
        chats = chats[0].messages
        console.log(chats)
        res.send(chats)
      }
    }
  })
});
router.post('/', function(req, res, next) {
  console.log(req.body)
  Chat.find({}, function(err, chats) {
    chat = chats[0]
    chat.messages.push({
      userName: req.body.user,
      userId: req.body.userId,
      message: req.body.message,
      createdAt: req.body.createdAt
    })
    chat.save()
  });
})

module.exports = router;
