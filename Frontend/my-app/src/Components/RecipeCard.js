import React, { useState } from "react";
import "../Styles/RecipeCard.css";
import imgX from "../Images/Home/bhindi-masala.jpg";
import RecipeModal from "./RecipeModal";
import axios from "axios";
 
const RecipeCard = ({ recipe, userID }) => {
  const [modalShow, setModalShow] = useState(false);
  const [comments, setComments] = useState([]);
 
  const handleViewClick = async ({ recipeID }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/comment/get/${recipeID}`,
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
 
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
              onClick={() => handleViewClick({ recipeID: recipe._id })}
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
          comments={comments}
          setComments={setComments}
          userID={userID}
        />
      )}
    </>
  );
};
 
export default RecipeCard;