const express = require("express");
const router = express.Router();
const recepieController = require("../controllers/recepieController");
const { checkAuthenticated } = require("../controllers/userController");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });

// Create a new recipe
router.post("/create", checkAuthenticated, recepieController.createRecepie);

// Get all recipes
router.get("/get", checkAuthenticated, recepieController.getAllRecepies); // give all my recepies and the chef's recepies which I follow

// Get a recipe by ID
router.get("/:id", checkAuthenticated, recepieController.getRecepieById);

// Update a recipe by ID
router.put("/:id", checkAuthenticated,upload.single('image'), recepieController.updateRecepieById);

// Delete a recipe by ID
router.delete("/:id", checkAuthenticated, recepieController.deleteRecepieById);

router.get("/getChef/:id", checkAuthenticated, recepieController.getChefById); // Recepie ID --> give Chef Details

router.get("/chef/:id", checkAuthenticated, recepieController.getRecepieByChef); // Chef ID --> Give all recepies created by chef (chef ID)

module.exports = router;
