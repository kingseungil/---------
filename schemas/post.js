const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

const postsSchema = new mongoose.Schema({
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
postsSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5);
});
postsSchema.plugin(AutoIncrement, { inc_field: "postid" });
module.exports = mongoose.model("Posts", postsSchema, "posts");
