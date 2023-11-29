const recepieService = require("../services/recepieService");
const userService = require("../services/userService");
const mongoose = require("mongoose");

// Controller function to create a new recipe
exports.createRecepie = async (req, res) => {
  try {
    if (req.user.role === "User") {
      res
        .status(500)
        .json({ message: "User is not allowed to create a recepie" });
    } else {
      req.body.chefID = req.user._id;

      const newRecepie = await recepieService.createRecepie(req.body);
      res.status(201).json(newRecepie);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to get all recipes
//if its user find all chefs recepies, if a chef display own recepies and following recepies,if admin show all
exports.getAllRecepies = async (req, res) => {
  try {
    let resp = [];

    if (req.user.role === "Admin") {
      const recipes = await recepieService.getAllRecepies();
      res.json(recipes);
    } else if (req.user.role === "Chef") {
      resp = await recepieService.getRecepieByOwner(req.user._id);

      for (let i = 0; i < req.user.following.length; i++) {
        const temp = await recepieService.getRecepieByOwner(
          req.user.following[i]
        );
        resp = resp.concat(temp);
      }

      res.json(resp);
    } else if (req.user.role === "User") {
      for (let i = 0; i < req.user.following.length; i++) {
        const temp = await recepieService.getRecepieByOwner(
          req.user.following[i]
        );
        resp = resp.concat(temp);
      }

      res.json(resp);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to get a recipe by ID
exports.getRecepieById = async (req, res) => {
  const recepieId = req.params.id;
  try {
    const recepie = await recepieService.getRecepieById(recepieId);

    if (!recepie) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recepie);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to update a recipe by ID
//only creator and admin can edit
exports.updateRecepieById = async (req, res) => {
  try {
    const recepieId = req.params.id;

    const recepie = await recepieService.getRecepieById(recepieId);
    if (req.user.role === "User") {
      res
        .status(500)
        .json({ message: "User is not allowed to edit a recepie" });
    } else if (
      req.user.role === "Chef" &&
      !recepie.chefID.equals(req.user._id)
    ) {
      res
        .status(500)
        .json({ message: "Only recepies Chef or Admin can update a recepie" });
    } else {
      const updatedRecepie = await recepieService.updateRecepieById(
        recepieId,
        req.body
      );

      if (!updatedRecepie) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      res.json(updatedRecepie);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to delete a recipe by ID
//only creator and admin can detele
exports.deleteRecepieById = async (req, res) => {
  try {
    if (req.user.role === "User") {
      res
        .status(500)
        .json({ message: "User is not allowed to delete a recepie" });
    } else {
      const recepieId = req.params.id;
      const recepie = await recepieService.getRecepieById(recepieId);
      if (recepie) {
        if (req.user.role === "Chef" && !recepie.chefID.equals(req.user._id)) {
          res
            .status(500)
            .json({
              message: "Only recepies Chef or Admin can delete a recepie",
            });
        }

        await recepieService.deleteRecepieById(recepieId);
        res.status(201).json({ message: "Recepie deleted successfully" });
      } else {
        res
          .status(500)
          .json({ message: "Recepie with given ID doesnot exist" });
      }
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// You can add more controller functions based on your application requirements
exports.getChefById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await recepieService.getRecepieById(recipeId);

    if (!recipe) {
      return res
        .status(500)
        .json({ message: "Recepie with given ID does not exist" });
    }

    const chefId = recipe.chefID;
    const chef = await userService.findUserById(chefId);

    if (!chef || chef.role != "Chef") {
      return res
        .status(500)
        .json({ message: "Chef with given ID does not exist" });
    }
    res.status(200).json(chef);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getRecepieByChef = async (req,res)=>{
  try{
    const chefID = req.params.id;
    const recipe = await recepieService.getByChefID(chefID);

    if (!recipe) {
      return res
        .status(500)
        .json({ message: "Recepie with given ID does not exist" });
    }
    res.status(200).json(recipe);


  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" });
  }
}
