const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    coverImage: {
        type: String,
        default: "images/defaultImgBlog.jpg"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId, //array of liked user ids
        ref: 'user'
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        commentContent: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {timestamps: true});

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;