const mongoose = require("mongoose");

const refString = "User";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: refString }], 
});

const User = mongoose.model(refString, userSchema);
module.exports = refString;
module.exports = User;
