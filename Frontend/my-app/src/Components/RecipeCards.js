import React from "react";
import RecipeCard from "./RecipeCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

var RecipeCards = ({ userID }) => {
  const [AllRecipes, setAllRecipes] = useState([]);
  const [isRecipe, setIsRecipe] = useState(false);

  useEffect(() => {
    const GetAllRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recepie/get/", {
          withCredentials: true,
        });
        if (response.data.length !== 0) {
          setIsRecipe(true);
        }
        setAllRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    GetAllRecipes();
  }, []);

  return (
    <>
      <div className="cardsContainer">
        <div className="row">
          {!isRecipe && (
            <h4>
              To discover more delicious recipes, consider exploring the
              profiles of talented chefs. Head over to the chef page, where you
              can follow your favorite culinary experts.
            </h4>
          )}
          {isRecipe &&
            AllRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} userID={userID} />
            ))}
        </div>
      </div>
    </>
  );
};

export default RecipeCards;
