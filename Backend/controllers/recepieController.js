const recepieService = require('../services/recepieService');
const mongoose = require('mongoose');

// Controller function to create a new recipe
exports.createRecepie = async (req, res) => {
  try {
    if (req.user.role==='User'){
      res.status(500).json({ message: 'User is not allowed to create a recepie' });
    }
    else{
      req.body.chefID = req.user._id
    
    const newRecepie = await recepieService.createRecepie(req.body);
    res.status(201).json(newRecepie);
    }
    
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to get all recipes
//if its user find all chefs recepies, if a chef display own recepies and following recepies,if admin show all
exports.getAllRecepies = async (req, res) => {
  try {
    const recepies = await recepieService.getAllRecepies();
    res.json(recepies);
  } catch (error) {
    console.error('Error getting recipes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to get a recipe by ID
exports.getRecepieById = async (req, res) => {
  const recepieId = req.params.id;

  try {
    const recepie = await recepieService.getRecepieById(recepieId);

    if (!recepie) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recepie);
  } catch (error) {
    console.error('Error getting recipe by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to update a recipe by ID
//only creator and admin can edit
exports.updateRecepieById = async (req, res) => {
  try {
  if (req.user.role==='User'){
    res.status(500).json({ message: 'User is not allowed to edit a recepie' });
  }
  
      const recepieId = req.params.id;

  
    const recepie = await recepieService.getRecepieById(recepieId);
    if (req.user.role==="Chef" && !recepie.chefID.equals(req.user._id)){
      console.log(recepie.chefID," ",req.user._id)
      res.status(500).json({ message: 'Only recepies Chef or Admin can update a recepie' });
    }
    else{
      const updatedRecepie = await recepieService.updateRecepieById(recepieId, req.body);

      if (!updatedRecepie) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      res.json(updatedRecepie);
    }

    
  } catch (error) {
    console.error('Error updating recipe by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to delete a recipe by ID
//only creator and admin can detele
exports.deleteRecepieById = async (req, res) => {
  try {
  if (req.user.role==='User'){
    res.status(500).json({ message: 'User is not allowed to delete a recepie' });
  }
  const recepieId = req.params.id;
  const recepie = await recepieService.getRecepieById(recepieId);
  if (req.user.role==="Chef" && recepie.chefID !=req.user._id){
    res.status(500).json({ message: 'Only recepies Chef or Admin can delete a recepie' });
  }

  
    await recepieService.deleteRecepieById(recepieId);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting recipe by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// You can add more controller functions based on your application requirements
