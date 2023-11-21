const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.checkPassword = (password) => {
  return password.length >= 8;
};

exports.checkEmail = (email) => {
  return /^[a-zA-Z0-9._-]+@northeastern\.edu$/.test(email);
};

exports.checkFullName = (fullName) => {
  return /^[a-zA-Z_]+$/.test(fullName);
};

exports.registerUser = async ({ fullName, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ fullName, email, password: hashedPassword, role });
  await user.save();
};

exports.findUserByEmail = (email) => {
  return User.findOne({ email });
};
