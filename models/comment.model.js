const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        post: {
            type: ObjectId,
            required: true,
        },
        likes: [{
            type: ObjectId,
        }],
        author: {
            type: ObjectId,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;