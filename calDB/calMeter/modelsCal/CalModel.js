const mongoose = require('mongoose');

const calSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true
  },
  scanned_items: [{
    type: String
  }],
 
  id: String,
  goal: String,
  consumedCal: String,
  date: Date,
});

const CalModel = mongoose.model('Cal', calSchema, 'caloriemeter');

module.exports = CalModel;
