const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const AutoIncrement = require("mongoose-sequence")(mongoose);
// const bcrypt = require("bcrypt");

const commentsSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    //! 작성자 이름은 id값으로 해주는 게 좋음! (닉네임을 바꿀수도 있기때문)
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
