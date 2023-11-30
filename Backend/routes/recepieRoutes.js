const express = require("express");
const router = express.Router();
const recepieController = require("../controllers/recepieController");
const { checkAuthenticated } = require("../controllers/userController");

// Create a new recipe
router.post("/create", checkAuthenticated, recepieController.createRecepie);

// Get all recipes
router.get("/get", checkAuthenticated, recepieController.getAllRecepies); // give all my recepies and the chef's recepies which I follow

// Get a recipe by ID
router.get("/:id", checkAuthenticated, recepieController.getRecepieById);

// Update a recipe by ID
router.put("/:id", checkAuthenticated, recepieController.updateRecepieById);

// Delete a recipe by ID
router.delete("/:id", checkAuthenticated, recepieController.deleteRecepieById);

router.get("/getChef/:id", checkAuthenticated, recepieController.getChefById); // Recepie ID --> give Chef Details

router.get("/chef/:id", checkAuthenticated, recepieController.getRecepieByChef); // Chef ID --> Give all recepies created by chef (chef ID)

module.exports = router;
