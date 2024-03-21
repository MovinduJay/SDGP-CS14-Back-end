const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const multer= require("multer")

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
});

const storage =multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads")
  },filename:(req,file,cb)=>{
    cb(null,req.body.name)
  },
})

const upload =multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
  res.status(200).json("File has been uploaded.")
})

// Routes
app.use('/api/posts', require('./routes/posts'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
