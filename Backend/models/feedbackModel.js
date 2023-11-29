const mongoose = require("mongoose");

const refString = "Feedback";

const feedbackSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String },
  Address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: Number },
  comment: { type: String, required: true },
  rate: { type: Number, required: true },
});

const Feedback = mongoose.model(refString, feedbackSchema);
module.exports = { Feedback, refString };
