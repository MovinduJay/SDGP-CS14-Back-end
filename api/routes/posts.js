const express = require('express');
const router = express.Router();
const Post = require('../models/Post');



// Route for searching posts
router.get('/search', async (req, res) => {
  const { query } = req.query; // Get the search query from the request

  try {
    // Search for posts that match the query
    const searchResults = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive title match
        { description: { $regex: query, $options: 'i' } }, // Case-insensitive description match
      ],
    });

    res.json(searchResults); // Return search results as JSON response
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Middleware to retrieve a post by ID
async function getPost(req, res, next) {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      console.log('Retrieved post:', post);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.locals.post = post; // Store the retrieved post in res.locals
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }


// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific post
router.get('/:id', getPost, (req, res) => {
  res.json(res.locals.post);
});


  
  //CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {snap
    res.status(500).json(err);
  }
});

// Update a post
router.patch('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // Check if the authenticated user's uid matches the uid associated with the post
    if (post.uid !== req.body.uid) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // Check if the authenticated user's uid matches the uid associated with the post
    if (post.uid !== req.body.uid) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    // Delete the post
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
