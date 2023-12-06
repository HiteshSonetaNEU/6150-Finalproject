import React, { useState } from "react";
import "../Styles/RecipeCard.css";
import imgX from "../Images/Home/bhindi-masala.jpg";
import RecipeModal from "./RecipeModal";
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

  return (
    <>
      <div className="col-sm-4 recipeCardContainer">
        <div className="card cardContainer">
          <img src={imgX} className="card-img-top" alt="..." />
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
        <RecipeModal
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
