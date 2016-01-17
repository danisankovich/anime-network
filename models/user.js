var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  email: String,
  password: String,
  friendIds: [],
  likes: [],
  willWatch: [],
  watchingAnime: [],
  completedAnime: [],
  blog: {
    name: String
  },
  reviews: [],
  eventsAttended: [],
  eventsHosted: []
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
