// foodModel.js
const mongoose = require('../config/db');

const foodSchema = new mongoose.Schema({
  product_name: String,
  brand: String,
  category: String,
  package_size: Number,
  ingredients: String,
  calories: Number,
  carbohydrates: Number,
  energy: Number,
  fibers: Number,
  proteins: Number,
  saturated_fat: Number,
  sugar: Number,
  sodium: Number,
  veg_fruit: Number,
  alternative: String,
});

const FoodModel = mongoose.model('Food', foodSchema, 'Food-Data');

module.exports = FoodModel;
