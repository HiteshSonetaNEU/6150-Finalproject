import React, { useState } from "react";
import "../Styles/RecipeCard.css";
import imgX from "../Images/Home/bhindi-masala.jpg";
import RecipeModal from "./RecipeModal";

const RecipeCard = ({ recipe }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleViewClick = () => {
    setModalShow(true);
  };

  return (
    <>
      <div className="col-sm-3 recipeCardContainer">
        <div className="card cardContainer">
          <img src={imgX} className="card-img-top" alt="..." />
          <div className="card-body recipe-card">
            <h5 className="card-title">{recipe.title}</h5>
            <p className="card-text">{recipe.description}</p>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target={"#modal" + recipe._id}
              className="btn btn-dark"
              onClick={handleViewClick}
            >
              View
            </button>
          </div>
        </div>
      </div>
      {modalShow && (
        <RecipeModal
          show={modalShow}
          handleClose={() => setModalShow(false)}
          chefData={recipe}
        />
      )}
    </>
  );
};

export default RecipeCard;
