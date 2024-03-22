// foodRoutes.js
const express = require('express');
const router = express.Router();
const FoodModel = require('./models/foodModel');

const User = require("./models/userModel");
const { generateRecommendation } = require('./models/generateRecommendation');

router.get('/checkUser/:uid', async (req, res) => {
  try {
    const { uid } = req.params;

    // Find the user with the given UID
    const user = await User.findOne({ uid });

    // Send a response indicating whether the user exists or not
    res.json({ exists: !!user });
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get the  scanned items from databse
// Endpoint to get scanned items for a specific user
router.get('/scannedItems/:uid', async (req, res) => {
  try {
    const { uid } = req.params;

    // Find the user with the given uid
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the scanned items for the user
    res.status(200).json(user.scanned_items);
  } catch (error) {
    console.error('Error fetching scanned items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get the current scanned item
router.get('/latestScannedItem/:uid', async (req, res) => {
  try {
    const { uid } = req.params;

    // Find the user with the given uid
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the latest scanned item
    const latestScannedItem = user.scanned_items[user.scanned_items.length - 1];

    // Return the latest scanned item
    res.status(200).json({ latestScannedItem });
  } catch (error) {
    console.error('Error fetching latest scanned item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//  endpoint for fetching food data
router.get('/fooddata', async (req, res) => {
  try {
    const foodData = await FoodModel.find({}); // Retrieve food items
    // console.log('Food Data:', foodData); // Add this line
    res.json(foodData);
  } catch (error) {
    console.error('Error fetching food data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create and save a new food item
router.post('/createFood', async (req, res) => {
  try {
    // Example data for a new food item
    const newFoodData = {
      "Name": "Senuda",
      "Brand": "Sen",
      "Category": "Bevarage",
    };

    // Create a new instance of the FoodModel
    const newFoodItem = new FoodModel(newFoodData);

    // Save the new food item to the database
    const savedFood = await newFoodItem.save();

    res.json(savedFood);
    console.log('Food item saved:', savedFood);
  } catch (error) {
    console.error('Error saving new food item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//  endpoint for saving health quiz answers
router.post('/healthquiz', async (req, res) => {
  try {
    // Extract the health quiz answers from the request body
    console.log(req.body)
    const { uid,health_conditions, dietary_preferences, food_avoidance, age_group, health_goal } = req.body;

    // Create a new user instance with the health quiz answers
    const user = new User({
      uid,
      health_conditions,
      dietary_preferences,
      food_avoidance,
      age_group,
      health_goal,
    });

    // Save the user to the database
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error saving health quiz answers:', error);
    res.status(500).json({ error: ' Server Error' });
  }
});


// Endpoint to save scanned item to the database 
router.post('/saveScannedItem', async (req, res) => {
  try {
    // Extract uid and scannedItem from request body
    const { uid, scannedItem } = req.body;

    // Find the user with the given uid
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the scannedItem to the user's scanned_items array
    // user.scanned_items.push(scannedItem);
    // Add the scannedItem to the user's scanned_items array
    user.scanned_items.push({ name: scannedItem, rating: '' });

 

    // Save the updated user document back to the database
    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (error) {
    console.error('Error saving scanned item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint to get food information for a scanned item
router.get('/foodInformation/:uid', async (req, res) => {
  try {
    const { uid } = req.params;

    // Find the user with the given uid
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the latest scanned item
    const scannedItem = user.scanned_items[user.scanned_items.length - 1];
    console.log(scannedItem);

    // Find the corresponding food information from the FoodData collection
    // const foodInformation = await FoodModel.findOne({ product_name: scannedItem});
     const foodInformation = await FoodModel.findOne({ product_name: scannedItem.name});

    if (!foodInformation) {
      return res.status(404).json({ error: 'Food information not found' });
    }

 
    // User health quiz answers
    const foodPreference = user.food_avoidance;
    const healthCondition = user.health_conditions;
    const dietaryPreference = user.dietary_preferences;
    const foodAvoidance = user.food_avoidance;
    const ageGroup = user.age_group;
    const healthGoal =user.health_goal

    // Going to store all the users health answers and feed it to our LLM model
    const HealthProfile = "I fall between age group of " + ageGroup + ", in terms of my health conditions : " + healthCondition
    + ". When it comes to food that I should avoid: " + foodAvoidance + " and the food i usually prefer " + foodPreference +
    ". When it comes to my dietary preference " + dietaryPreference + ".My health goal is to improve " + healthGoal;



    

    console.log(HealthProfile);


    // Get the recommendation
    const recommendation = await generateRecommendation(HealthProfile, scannedItem.name);

    console.log("the recomnedation is " +recommendation);


        // Store the rating in the database
    // Update the rating for the latest scanned item
    user.scanned_items[user.scanned_items.length - 1].rating = recommendation;
    await user.save();

    // Return the food information along with its recomnedation 
    res.status(200).json({foodInformation , recommendation});

   
  } catch (error) {
    console.error('Error fetching food information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get the barcode Food teim data

// Endpoint to update the rating of the latest scanned item and generate a recommendation
router.get('/updateRatingAndGenerateRecommendation/:uid', async (req, res) => {
  try {
    const { uid } = req.params;

    // Find the user with the given uid
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the latest scanned item
    const scannedItem = user.scanned_items[user.scanned_items.length - 1];

    if (!scannedItem) {
      return res.status(404).json({ error: 'Scanned item not found' });
    }

    // Generate health profile
    
        // User health quiz answers
        const foodPreference = user.food_avoidance;
        const healthCondition = user.health_conditions;
        const dietaryPreference = user.dietary_preferences;
        const foodAvoidance = user.food_avoidance;
        const ageGroup = user.age_group;
        const healthGoal =user.health_goal
    
        // Going to store all the users health answers and feed it to our LLM model
        const HealthProfile = "I fall between age group of " + ageGroup + ", in terms of my health conditions : " + healthCondition
        + ". When it comes to food that I should avoid: " + foodAvoidance + " and the food i usually prefer " + foodPreference +
        ". When it comes to my dietary preference " + dietaryPreference + ".My health goal is to improve " + healthGoal;
    
    

    // Generate recommendation
    const recommendation = await generateRecommendation(HealthProfile, scannedItem.name);

    // Update the rating for the latest scanned item
    scannedItem.rating = recommendation;
    await user.save();

    res.status(200).json({ scannedItem, recommendation });
  } catch (error) {
    console.error('Error updating rating and generating recommendation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
