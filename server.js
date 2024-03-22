// server.js
const express = require('express');
const mongoose = require('mongoose');
const foodRoutes = require('./foodRoutes');
const cors = require('cors'); // Import the cors middleware
const { getIdTokenResult } = require('firebase/auth');
const { generateRecommendation } = require('./models/generateRecommendation');






// require and read env file
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_KEY, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB:', db.name);
});

// Middleware to parse JSON in request body
app.use(express.json());

// Use the foodRoutes for /api
app.use('/api', foodRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // console.log(process.env.OPENAI_API_KEY);
  // console.log(process.env.MONGODB_CONNECTION_KEY)

});
