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
  reviews: {type: Array},
  forumPosts: {type: Array},
  myTopics: {type: Array},
  eventsAttended: {type: Array},
  eventsHosted: {type: Array},
  invitedTo: {type: Array}, //list of event Ids they were invited to
  photos: {type: Array}, //array of objects. one of the properties is profilePicture. with a boolean. checks to see if it is url or an upload and acts accordingly (another boolean perhaps?)
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
