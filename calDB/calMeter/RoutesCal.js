const express = require('express');
const router = express.Router();
const CalModel = require('./modelsCal/CalModel');

router.get('/caldata', async (req, res) => {
  try {
    const calData = await CalModel.find({});
    res.json(calData);
  } catch (error) {
    console.error('Error fetching cal data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
