const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const AutoIncrement = require("mongoose-sequence")(mongoose);

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
postsSchema.plugin(AutoIncrement, { inc_field: "id" });
module.exports = mongoose.model("Posts", postsSchema);
