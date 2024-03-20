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
},
{timestamps:true}
);

module.exports = mongoose.model("Post",PostSchema);