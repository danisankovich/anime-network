var Mongoose = require('mongoose');

var Post = Mongoose.Schema({
  userId: String,
  body: String,
  topicId: String,
  replyTo: String,
  replies: String,
  dateCreated: {type: Date, default: Date.now},
  likes: {type: Number, default: 0}
});

module.exports = Mongoose.model('Post', Post);
