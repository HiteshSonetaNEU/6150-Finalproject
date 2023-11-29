const mongoose = require("mongoose");

const refString = "User";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  profileDes: { type: String, required: true},
  specialities: [{type: String, required: true}],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: refString }], 
});

userSchema.methods.toSearchableString = function() {
  return `${this.fullName}  ${this.email} ${this.profileDes} ${this.specialities}`.toLowerCase()
}

const User = mongoose.model(refString, userSchema);
module.exports = {User, refString}
