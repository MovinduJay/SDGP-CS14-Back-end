const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

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

// Middleware to check if the user is the owner of the post
function checkOwnership(req, res, next) {
    // Assuming you have a user object attached to the request after authentication
    const currentUser = req.user;
    const postOwner = res.locals.post.user_id; // Assuming user_id is the field storing the user ID in the post schema
    if (currentUser && currentUser.uid === postOwner) {
        next(); // User is the owner, proceed to the next middleware/route handler
    } else {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
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
  res.json(res.locals.post); // Use res.locals.post instead of res.post
});

// CREATE POST
router.post("/", async (req, res) => {
  const { title, description, img, category, user_id } = req.body;
  const newPost = new Post({
    title,
    description,
    img,
    category,
    user_id // Assign the user ID to the post
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.patch('/:id', getPost, checkOwnership, async (req, res) => {
  try {
    // Check if the fields to update are provided in the request body
    if (req.body.title) {
      res.locals.post.title = req.body.title;
    }
    if (req.body.description) {
      res.locals.post.description = req.body.description;
    }

    // Save the updated post
    const updatedPost = await res.locals.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post
router.delete('/:id', getPost, checkOwnership, async (req, res) => {
  const postId = req.params.id;
  try {
      const deletedPost = await Post.findOneAndDelete({ _id: postId });
      if (!deletedPost) {
          return res.status(404).json({ message: 'Post not found' });
      }
      res.json({ message: 'Deleted post', deletedPost });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

module.exports = router;
