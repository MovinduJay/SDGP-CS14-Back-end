// routes/posts.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/Post');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  const { title, desc } = req.body;
  const newPost = new Post({
    title,
    desc,
    img: req.file.filename, // Assuming the file field name is 'file'
    createdAt: new Date()
  });
  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

