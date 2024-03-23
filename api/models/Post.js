const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:false
    },
    category:{
        type:Array,
        required:false,
    },
    //user_id: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'User-Data', // This should be the name of  User model
    //    required: true
    //}
    
},
{timestamps:true}
);

module.exports = mongoose.model("Blog-post", PostSchema, "Blog-post");
