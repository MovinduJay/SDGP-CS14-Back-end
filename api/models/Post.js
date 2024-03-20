const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  img: String,
  title: String,
  category: String,
  date: String,
  description: String,
});

module.exports = mongoose.model('Post', postSchema);
