const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  health_conditions: String,
  dietary_preferences: String,
  food_avoidance: String,
  age_group: String,
  health_goal: String,
  scanned_items: [{ 
    name: { type: String },
    rating: { type: String}
  }],
});


const User = mongoose.model('User', userSchema ,'User-Data');

module.exports = User;

