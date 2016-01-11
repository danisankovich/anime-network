var Mongoose = require('mongoose');

var Forum = Mongoose.Schema({
  showId: String, //===shows mongoId
  topics: []
});

module.exports = Mongoose.model('Forum', Forum);
