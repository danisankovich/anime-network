var Mongoose = require('mongoose');

var Topic = Mongoose.Schema({
  forumId: String,//===forums mongoId
  title: String,
  dateCreated: {type: Date, default: Date.now},
  spoilers: {type: Boolean, default: false},
  body: String,
  responses: [{
    userId: String,
    body: String
  }]
});

module.exports = Mongoose.model('Topic', Topic);
