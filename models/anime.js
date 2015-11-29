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
  rating: {type: Number, default: 0},
  age_rating: String,
  genres: []
});

module.exports = Mongoose.model('Anime', Anime);
// module.exports = anime;
