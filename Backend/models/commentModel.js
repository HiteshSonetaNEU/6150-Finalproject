const mongoose = require("mongoose");
const { refString: userRef } = require("./userModel");

const refString = "Comment";

const commentSchema = new mongoose.Schema({
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: userRef },
});

const Comment = mongoose.model(refString, commentSchema);

module.exports = Comment;
module.exports = refString;
