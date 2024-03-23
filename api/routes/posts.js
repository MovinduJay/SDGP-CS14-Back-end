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


  
  //CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.patch('/:id', getPost, async (req, res) => {
  try {
    if (req.body.title) {
      res.locals.post.title = req.body.title;
    }
    if (req.body.description) {
      res.locals.post.description = req.body.description;
    }

    const updatedPost = await res.locals.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Delete a post
router.delete('/:id', async (req, res) => {
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
