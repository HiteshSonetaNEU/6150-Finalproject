const { Recepie } = require('../models/recepieModel');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

// Function to create a new recipe
async function createRecepie(data) {
  try {
    const newRecepie = new Recepie(data);
    await newRecepie.save();
    return newRecepie;
  } catch (error) {
    throw error;
  }
};

// Function to get all recipes
async function getAllRecepies() {
  try {
    const recepies = await Recepie.find();
    return recepies;
  } catch (error) {
    throw error;
  }
};

// Function to get a recipe by ID
async function getRecepieById(recepieId) {
  try {
    const recepie = await Recepie.findById(recepieId);
    return recepie;
  } catch (error) {
    throw error;
  }
};

// Function to update a recipe by ID
async function updateRecepieById(recepieId, data) {
  try {
    const updatedRecepie = await Recepie.findByIdAndUpdate(recepieId, data, { new: true });
    return updatedRecepie;
  } catch (error) {
    throw error;
  }
};

// Function to delete a recipe by ID
async function deleteRecepieById(recepieId) { 
  try {
    await Recepie.findByIdAndDelete(recepieId);
  } catch (error) {
    throw error;
  }
};

async function getByChefID(chefID) {
  try {
    const objectId = new ObjectId(chefID);
    const recepie= await Recepie.find({chefID:objectId});
    return recepie
  } catch (error) {
    throw error;
  }
};

async function getRecepieByOwner(id) {
  try {
    const ownerId = new mongoose.Types.ObjectId(id);
    console.log(ownerId)
    const recipes = await Recepie.find({ chefID: id });
    console.log(recipes)
    return recipes;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRecepie,
  getAllRecepies,
  getRecepieById,
  updateRecepieById,
  deleteRecepieById,
  getByChefID,
  getRecepieByOwner
}

