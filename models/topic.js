var Mongoose = require('mongoose');

var Topic = Mongoose.Schema({
  forumId: String,//===forums mongoId
  title: String,
  creatorId: String,
  dateCreated: {type: Date, default: Date.now},
  spoilers: {type: Boolean, default: false},
  viewCount: {type: Number, default: 0},
  likes: {type: Number, default: 0},
  body: String,
  mostRecentUser: String,
  responses: {type: Array, default: []}
});

module.exports = Mongoose.model('Topic', Topic);
