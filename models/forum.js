var Mongoose = require('mongoose');

var Forum = Mongoose.Schema({
  showId: String, //===shows mongoId
  slug: String,  //shows slug------
  title: String,  //shows title----these two are needed for forum search.(no need to go to show's page first)
  topics: []
});

module.exports = Mongoose.model('Forum', Forum);
