const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');

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
  res.json(res.post);
});

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination folder for file uploads
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set the file name to prevent duplication
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Create a new post with image upload
  router.post('/', upload.single('image'), async (req, res) => {
    const post = new Post({
      img: req.file.path, // Store the file path or URL in the database
      title: req.body.title,
      category: req.body.category,
      date: req.body.date,
      description: req.body.description,
    });
  
    try {
      const newPost = await post.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Update a post
router.patch('/:id', getPost, async (req, res) => {
  if (req.body.img != null) {
    res.post.img = req.body.img;
  }
  if (req.body.title != null) {
    res.post.title = req.body.title;
  }
  if (req.body.category != null) {
    res.post.category = req.body.category;
  }
  if (req.body.date != null) {
    res.post.date = req.body.date;
  }
  if (req.body.description != null) {
    res.post.description = req.body.description;
  }

  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post
router.delete('/:id', getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: 'Deleted post' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.post = post;
  next();
}

module.exports = router;