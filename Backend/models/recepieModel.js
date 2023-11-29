const mongoose = require("mongoose");
const {refString: userRef} = require("./userModel");
const refString = "Recepie";

const recepieSchema = new mongoose.Schema({
  ingredients: [String],
  description: String,
  title: String,
  photo: String,
  chefID: { type: mongoose.Schema.Types.ObjectId, ref: userRef }
});

recepieSchema.methods.toSearchableString = function() {
  return `${this.title} ${this.description} ${this.ingredients.join(" ")}`.toLowerCase()
}

const Recepie = mongoose.model("Recepie", recepieSchema);
module.exports = {Recepie, refString}

