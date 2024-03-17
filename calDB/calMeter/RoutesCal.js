
const express = require('express');
const router = express.Router();
const CalModel = require('./modelsCal/CalModel');
const UserModel = require('./modelsCal/UserModel');



// GET route to fetch all calData
router.get('/caldata', async (req, res) => {
    try {
      const calData = await CalModel.find({});
      res.json(calData);
    } catch (error) {
      console.error('Error fetching cal data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // POST route to add new calData
  router.post('/caldata', async (req, res) => {
    try {
      // Extract data from request body
      const { uid } = req.body;
  
      // Fetch scanned_items from User-Data based on uid
      const userData = await UserModel.findOne({ uid });
      const {scanned_items} = userData; // Assuming scanned_items is a field in User-Data schema
  
      // Extract other data from request body
      const { id, goal,consumedCal, date } = req.body;
  
      // Create a new calData document
      const newCalData = new CalModel({
        uid,
        scanned_items,
        id,
        goal,
        consumedCal,
        date
      });
      
  
      // Save the new calData document to the database
      await newCalData.save();
  
      res.status(201).json(newCalData);
    } catch (error) {
        console.log(req.body.goal);
      console.error('Error adding cal data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;
  