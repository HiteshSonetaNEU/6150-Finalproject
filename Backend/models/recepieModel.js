const mongoose = require("mongoose");

const refString = "User";

const recepieSchema = new mongoose.Schema({
  ingredients: [String],
  description: String,
  title: String,
  photo: String,
  chefID: { type: mongoose.Schema.Types.ObjectId, ref: refString },
  comments:[mongoose.Schema.Types.ObjectId]
});

const Recepie = mongoose.model("Recepie", recepieSchema);
module.exports = Recepie;

