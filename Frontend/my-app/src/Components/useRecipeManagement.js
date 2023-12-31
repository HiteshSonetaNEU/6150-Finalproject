import { useState, useEffect } from "react";
import axios from "axios";

const useRecipeManagement = (userID) => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
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
          console.log(error);
        }
      } else {
        try {
          const response = await axios.get(
            `http://localhost:3001/recepie/chef/${userID}`,
            {
              withCredentials: true,
            }
          );
          setRecipes(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch {}
  };

  useEffect(() => {
    fetchRecipes();
  }, [userID]);

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
      console.log(error);
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
      console.log(error);
    }
  };

  return { recipes, deleteRecipe, editRecipe };
};

export default useRecipeManagement;
