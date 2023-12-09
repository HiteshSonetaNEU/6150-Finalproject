import React from "react";
import RecipeCardUser from "./RecipeCardUser";

import { useState, useEffect} from "react";
import axios from "axios";

const RecipeCardsUser = ({ userID }) => {

  const [recipes, setRecipes] = useState([])

  const useRecipeManagement = (userID) => {
  
    const deleteRecipe = async (recipeID) => {
      try {
        const response = await axios.delete(
          `http://localhost:3001/recepie/${recipeID}`,
          {
            withCredentials: true,
          }
        );
  
        if (response.data.message === "Recepie deleted successfully") {
          // If deletion is successful, fetch recipes again to refresh the list
          fetchRecipes();
        }
      } catch (error) {
        // console.log(error);
      }
    };
  
    const editRecipe = async (recipeID, editedRecipe) => {
      try {
        const response = await axios.put(
          `http://localhost:3001/recepie/${recipeID}`,
          editedRecipe,
          {
            withCredentials: true,
          }
        );
        if (response.statusText === "OK") {
          fetchRecipes();
        }
      } catch (error) {
        // console.log(error);
      }
    };
  
    return { deleteRecipe, editRecipe };
  };

  const { deleteRecipe, editRecipe } = useRecipeManagement(userID);

  useEffect(() => {
    fetchRecipes();
  });

  const fetchRecipes = async () => {
    // console.log("Inside fetchRecipes");
    try {
      const response = await axios.get(`http://localhost:3001/`, {
        withCredentials: true,
      });

      if (response.data.role === "Admin") {
        try {
          const response = await axios.get(
            `http://localhost:3001/recepie/get`,
            {
              withCredentials: true,
            }
          );
          setRecipes(response.data);
        } catch (error) {
          // console.log(error);
        }
      } else {
        try {
          const response = await axios.get(
            `http://localhost:3001/recepie/chef/${userID}`,
            {
              withCredentials: true,
            }
          );
          // console.log("Recipes: "+response.data)
          setRecipes(response.data);
        } catch (error) {
          // console.log(error);
        }
      }
    } catch {}
  };

  


  const handleEditRecipe = (recipeID, editedRecipe) => {
    // Call your editRecipe function from useRecipeManagement here
    // Pass recipeID and editedRecipe to the editRecipe function
    editRecipe(recipeID, editedRecipe);
  };

  return (
    <>
      <div className="cardsContainer">
        <div className="row">
          {recipes.length === 0 && <div style={{ textAlign: "center"}}>You have not created any recipes yet!</div>}
          {recipes.map((recipe) => (
            <RecipeCardUser
              key={recipe._id}
              recipe={recipe}
              onDeleteRecipe={() => deleteRecipe(recipe._id)}
              onEditRecipe={handleEditRecipe}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipeCardsUser;
