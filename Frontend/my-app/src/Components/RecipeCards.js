import React from "react";
import RecipeCard from "./RecipeCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

var RecipeCards = () => {
  const [AllRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const GetAllRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recepie/get/", {
          withCredentials: true,
        });
        // console.log(response.data);
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
          {AllRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipeCards;
