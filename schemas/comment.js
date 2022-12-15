const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const AutoIncrement = require("mongoose-sequence")(mongoose);
// const bcrypt = require("bcrypt");

const commentsSchema = new mongoose.Schema({
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
    postId: {
        type: Number,
        ref: "Posts",
    },
});
// postsSchema.pre("save", async function () {
//     this.password = await bcrypt.hash(this.password, 5);
// });
commentsSchema.plugin(AutoIncrement, { inc_field: "commentid" });
module.exports = mongoose.model("Comments", commentsSchema, "comments");
