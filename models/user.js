var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  email: String,
  password: String,
  friendIds: [],
  likes: [],
  watchingAnime: [],
  completedAnime: [],
  blog: {
    name: String
  },
  reviews: [{
    title: String,
    show: String,
    body: String,
    date: {type: Date, default: Date.now},
    rating: Number
  }]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
