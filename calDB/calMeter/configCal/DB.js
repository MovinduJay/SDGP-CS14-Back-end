const mongoose = require('mongoose');

const connectionUri = 'mongodb+srv://nutrimatecs14:nutrimatesdgp@nutrimate-db.cy528h9.mongodb.net/?retryWrites=true&w=majority&appName=Nutrimate-DB';

mongoose.connect(connectionUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;