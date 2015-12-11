var Mongoose = require('mongoose');

var Anime = Mongoose.Schema({
  slug: String,
  status: String,
  url: String,
  title: String,
  alternate_title: String,
  episode_count: Number,
  episode_length: Number,
  cover_image: String,
  synopsis: String,
  show_type: String,
  started_airing: String,
  finished_airing: String,
  community_rating: Number,
  rating: {type: Number},
  age_rating: String,
  genres: [],
  usersCompleted: [],
  usersWatching: [],
  likes: [],
  reviews: [{
    title: String,
    user: String,
    body: String,
    date: {type: Date, default: Date.now},
    rating: Number
  }]
});

Anime.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

module.exports = Mongoose.model('Anime', Anime);
// module.exports = anime;
