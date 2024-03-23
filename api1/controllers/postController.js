const Post = require('../models/Post');

// Function to handle creating a new post
const createPost = async (req, res) => {
  try {
    const { title, desc } = req.body;
    
    // Check if file was uploaded
    const img = req.file ? req.file.filename : null;

    // Create a new post instance
    const newPost = new Post({
      title,
      desc,
      img,
      createdAt: new Date()
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createPost
};
