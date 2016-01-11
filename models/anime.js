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
  ratings: {type: Array},
  age_rating: String,
  genres: [],
  usersCompleted: [],
  usersWatching: [],
  favorites: [],
  reviews: [], //mongoid of the review you made
  questions: {type: Array},
  similar: []
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
