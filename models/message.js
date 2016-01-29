var Mongoose = require('mongoose');

var Message = Mongoose.Schema({
  senderId: String,
  recipientId: String,
  subject: String,
  body: String,
  dateCreated: {type: Date, default: Date.now},
  read: Boolean
});

module.exports = Mongoose.model('Message', Message);
