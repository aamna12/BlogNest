const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {timestamps: true});

const User = mongoose.model('user', userSchema);

module.exports = User;