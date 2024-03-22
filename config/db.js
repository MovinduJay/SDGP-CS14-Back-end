// db.js

// require and read env file
require("dotenv").config();


const mongoose = require('mongoose');

const connectionUri = process.env.MONGODB_CONNECTION_KEY;

mongoose.connect(connectionUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;  // Export the mongoose object for use in models
