const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const postsSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    regDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Posts", postsSchema);
