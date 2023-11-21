const mongoose = require("mongoose");
const userRef = require("./userModel")

const commentSchema = new mongoose.Schema({
  messge: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: userRef}
});

const User = mongoose.model("Comment", commentSchema);

module.exports = User;