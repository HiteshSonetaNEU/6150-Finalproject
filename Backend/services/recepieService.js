const { Recepie } = require('../models/recepieModel');

// Function to create a new recipe
exports.createRecepie = async (data) => {
  try {
    console.log("data===",data)
    const newRecepie = new Recepie(data);
    await newRecepie.save();
    return newRecepie;
  } catch (error) {
    throw error;
  }
};

// Function to get all recipes
exports.getAllRecepies = async () => {
  try {
    const recepies = await Recepie.find();
    return recepies;
  } catch (error) {
    throw error;
  }
};

// Function to get a recipe by ID
exports.getRecepieById = async (recepieId) => {
  try {
    const recepie = await Recepie.findById(recepieId);
    return recepie;
  } catch (error) {
    throw error;
  }
};

// Function to update a recipe by ID
exports.updateRecepieById = async (recepieId, data) => {
  try {
    const updatedRecepie = await Recepie.findByIdAndUpdate(recepieId, data, { new: true });
    return updatedRecepie;
  } catch (error) {
    throw error;
  }
};

// Function to delete a recipe by ID
exports.deleteRecepieById = async (recepieId) => {
  try {
    await Recepie.findByIdAndDelete(recepieId);
  } catch (error) {
    throw error;
  }
};

// You can add more functions based on your application requirements
