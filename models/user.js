var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  email: String,
  password: String,
  friendIds: [],
  favoriteAnime: [],
  blog: {
    name: String
  }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
