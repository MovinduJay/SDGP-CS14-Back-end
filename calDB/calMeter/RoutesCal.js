
const express = require('express');
const router = express.Router();
const CalModel = require('./modelsCal/CalModel');
const UserModel = require('./modelsCal/UserModel');

router.get('/caloriemeter', async (req, res) => {
    try {
        // Retrieve data from "caloriemeter" collection
        const calData = await CalModel.find({});

        // Retrieve data from "User-Data" collection
        const userData = await UserModel.find({});

            // Merge data as needed
        const mergedData = calData.map(calItem => {
            // Find the user data corresponding to the current calItem's userId
            const userItem = userData.find(user => user.uid === calItem.uid);
            
            // Merge calItem with userItem
            return {
                ...calItem.toObject(), // Convert Mongoose document to plain JavaScript object
                userItem: userItem ? userItem.toObject() : null // Include user data if found, otherwise null
            };
        });


        res.json(mergedData);
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).send("Error retrieving data from database");
    }
});

module.exports = router;
