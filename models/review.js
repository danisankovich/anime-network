var Mongoose = require('mongoose');

var Review = Mongoose.Schema({
  showId: String,//===shows mongoId
  title: String,
  user: String,
  body: String,
  date: {type: Date, default: Date.now},
  userRating: Number,
  ratingRating: {type: Array, default: []}
});

module.exports = Mongoose.model('Review', Review);
