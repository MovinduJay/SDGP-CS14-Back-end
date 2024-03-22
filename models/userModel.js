// userModel.js
const mongoose = require('../config/db');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  health_conditions: String,
  dietary_preferences: String,
  food_avoidance: String,
  age_group: String,
  health_goal: String,
  // scanned_items: [{ type: String }], // Array to store scanned items
  scanned_items: [{ 
    name: { type: String },
    rating: { type: String}
  }],
});

// const FoodModel = mongoose.model('Food', foodSchema, 'Food-Data');
const User = mongoose.model('User', userSchema ,'User-Data');

module.exports = User;

