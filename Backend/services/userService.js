const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");

function checkPassword (password) {
  return password.length >= 8;
};

function checkEmail(email) {
  return /^[a-zA-Z0-9._-]+@northeastern\.edu$/.test(email);
};

function checkFullName(fullName) {
  return /^[a-zA-Z_ ]+$/.test(fullName);
};

async function registerUser({ fullName, email, password, role, profileDes, specialities }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ fullName, email, password: hashedPassword, role, profileDes, specialities });
  await user.save();
};

function findUserByEmail(email) {
  return User.findOne({ email });
};

function getUsers() {
  return User.find();
}

async function findUserById(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  checkEmail,
  checkFullName,
  checkPassword,
  registerUser,
  findUserByEmail,
  getUsers,
  findUserByEmail,
  findUserById
}