const express = require('express');
const router = express.Router();
const recepieController = require('../controllers/recepieController');
const {checkAuthenticated}= require('../controllers/userController')

// Create a new recipe
router.post('/create', checkAuthenticated,recepieController.createRecepie);

// Get all recipes
router.get('/get',checkAuthenticated, recepieController.getAllRecepies);

// Get a recipe by ID
router.get('/:id',checkAuthenticated, recepieController.getRecepieById);

// Update a recipe by ID
router.put('/:id', checkAuthenticated,recepieController.updateRecepieById);

// Delete a recipe by ID
router.delete('/:id', checkAuthenticated,recepieController.deleteRecepieById);

router.get('/getChef/:id', checkAuthenticated, recepieController.getChefById)

module.exports = router;
