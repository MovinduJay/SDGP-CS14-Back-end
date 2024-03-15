const mongoose = require('../configCal/DB');

const userSchema = new mongoose.Schema({
  uid: String,
  // Add other fields as per your schema
});

const UserModel = mongoose.model('User', userSchema, 'User-Data');

module.exports = UserModel;
