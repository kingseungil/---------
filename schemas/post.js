const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const postsSchema = new mongoose.Schema({
    postsId: {
        type: Number,
        required: true,
        unique: true,
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
        type: string,
        required: true,
    },
    regDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Goods", goodsSchema);
