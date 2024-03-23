const express = require('express');
const mongoose = require('mongoose');
const RoutesCal = require('./RoutesCal');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
// MongoDB setup
mongoose.connect('mongodb+srv://nutrimatecs14:nutrimatesdgp@nutrimate-db.cy528h9.mongodb.net/?retryWrites=true&w=majority&appName=Nutrimate-DB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
// Importing the CalData model

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB:', db.name);
});


app.use(express.json());

app.use('/api', RoutesCal);

// Route to delete data by ID
/*app.delete('/api/caldata/:id', async (req, res) => {
  try {
      await CalData.findByIdAndDelete(req.params.id);
      res.status(200).send('Data deleted successfully');
  } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).send('Error deleting data');
  }
});
*/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

