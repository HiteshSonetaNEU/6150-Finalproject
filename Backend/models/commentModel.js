const mongoose = require("mongoose");
const { refString: userRef } = require("./userModel");
const { refString: recepieRef } = require("./recepieModel");

const refString = "Comment";

const commentSchema = new mongoose.Schema({
  recepieId: { type: mongoose.Schema.Types.ObjectId, ref: recepieRef },
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: userRef },
  createdAt: {
    type: Date,
    default: Date.now
  },
});


const Comment = mongoose.model(refString, commentSchema);

module.exports = {
  Comment,
  refString,
};
