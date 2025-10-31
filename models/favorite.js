const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  title: String,
  image: String,
  sourceUrl: String,
});

module.exports = mongoose.model('Favorite', favoriteSchema);
