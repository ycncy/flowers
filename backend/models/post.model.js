const mongoose = require('mongoose');
const {ObjectId} = require("mongodb");

const postSchema = new mongoose.Schema(
    {
        image_url: {type: String, required: true},
        description: {type: String},
        author: {type: String, required: true},
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
        }],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
        }]
    },
    {
        timestamps: true
    }
);

const Posts = mongoose.model("Posts", postSchema);
module.exports = Posts;