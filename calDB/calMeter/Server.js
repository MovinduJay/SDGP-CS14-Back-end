const express = require('express');
const mongoose = require('mongoose');
const RoutesCal = require('./RoutesCal');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb+srv://nutrimatecs14:nutrimatesdgp@nutrimate-db.cy528h9.mongodb.net/?retryWrites=true&w=majority&appName=Nutrimate-DB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB:', db.name);
});

app.use(express.json());

app.use('/api', RoutesCal);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});