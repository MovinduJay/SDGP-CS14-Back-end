const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    category: {
        type: Array,
        required: false,
    },
    // Reference to the User model using the uid field
    uid: {
        type: String,
        ref: 'User',
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Blog-post", PostSchema, "Blog-post");

