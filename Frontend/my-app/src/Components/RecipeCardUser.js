import React, { useState } from "react";
import "../Styles/RecipeCard.css";
import imgX from "../Images/Home/sushi-nigiri-img.jpg";
import RecipeModalUser from "./RecipeModalUser";
import EditRecipeModal from "./EditRecipeModal";

const RecipeCardUser = ({ recipe, onDeleteRecipe, onEditRecipe }) => {
  const [viewModalShow, setViewModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const handleViewClick = () => {
    setViewModalShow(true);
  };

  const handleEditClick = () => {
    setEditModalShow(true);
  };

  console.log(recipe);
  console.log();
  var recipeImage = "http://localhost:3001/api/images/" + recipe.photo;
  if (recipe.photo === undefined) {
    recipeImage = imgX;
  }

  return (
    <>
      <div className="col-sm-4 recipeCardContainer">
        <div className="card cardContainer">
          <img src={recipeImage} className="card-img-top" alt="..." />
          <div className="card-body recipe-card">
            <h5 className="card-title">{recipe.title}</h5>
            <p className="card-text">{recipe.description}</p>
            <div className="buttonContainer">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target={"#modal" + recipe._id}
                className="btn btn-dark"
                onClick={handleViewClick}
                id={"RecipeModalView" + recipe._id}
              >
                View
              </button>
              <button
                className="btn btn-dark btn-delete"
                onClick={() => onDeleteRecipe(recipe._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-dark btn-edit"
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      {viewModalShow && (
        <RecipeModalUser
          show={viewModalShow}
          handleClose={() => setViewModalShow(false)}
          chefData={recipe}
        />
      )}
      {editModalShow && (
        <EditRecipeModal
          show={editModalShow}
          handleClose={() => setEditModalShow(false)}
          chefData={recipe}
          onEditRecipe={onEditRecipe}
        />
      )}
    </>
  );
};

export default RecipeCardUser;
