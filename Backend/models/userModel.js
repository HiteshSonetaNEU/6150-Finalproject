const mongoose = require("mongoose");

const refString = "User";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  role: String,
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: refString }],
});

const User = mongoose.model(refString, userSchema);
module.exports = refString;
module.exports = User;

