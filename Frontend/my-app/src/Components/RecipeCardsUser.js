import React from "react";
import RecipeCardUser from "./RecipeCardUser";
import useRecipeManagement from "./useRecipeManagement";

const RecipeCardsUser = ({ userID, userRecipes }) => {
  const { recipes, deleteRecipe, editRecipe } = useRecipeManagement(userID);

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
