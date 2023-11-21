const mongoose = require("mongoose");
const {refString: userRef} = require("./userModel");
const {refString: commentRef} = require("./commentModel");
const refString = "Recepie";

const recepieSchema = new mongoose.Schema({
  ingredients: [String],
  description: String,
  title: String,
  photo: String,
  chefID: { type: mongoose.Schema.Types.ObjectId }
});

const Recepie = mongoose.model("Recepie", recepieSchema);
module.exports = {Recepie, refString}

