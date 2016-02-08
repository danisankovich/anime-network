var Mongoose = require('mongoose');

var Chat = Mongoose.Schema({
  messages: {type: Array}
});

module.exports = Mongoose.model('Chat', Chat);
