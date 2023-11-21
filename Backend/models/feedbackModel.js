const mongoose = require("mongoose");

const refString = "Feedback";

const feedbackSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  Address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: Number, required: true },
  comment: { type: String },
  rate: { type: Number },
});

const Feedback = mongoose.model(refString, feedbackSchema);
module.exports = Feedback;
module.exports = refString;
