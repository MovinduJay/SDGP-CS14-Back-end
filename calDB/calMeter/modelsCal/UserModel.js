const mongoose = require('../configCal/DB');

const userSchema = new mongoose.Schema({
  id:  String,
  uid: String,
  health_conditions: String,
  dietary_preferences:String,
  food_avoidance: String,
  age_group:String,
  health_goal: String,
  scanned_items: Array,
  
});

const UserModel = mongoose.model('User', userSchema, 'User-Data');

module.exports = UserModel;
