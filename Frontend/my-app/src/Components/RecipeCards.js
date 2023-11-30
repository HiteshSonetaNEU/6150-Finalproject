import React from "react";

import RecipeCard from "./RecipeCard";

var RecipeCards = ({ recipeData }) => {
  var messageX = [
    {
      _id: "655f997390e675518e02e941",
      ingredients: ["Bhindi", "Oil", "Masala"],
      description:
        "If there’s one classic bhindi (okra) dish with North Indian flavors, it is the Bhindi Masala. This is a semi-dry preparation featuring the star ingredient okra pods (bhindi in Hindi), piquant onions, tangy tomatoes, bold Indian spices and herbs. It is one of the most popular dishes served in almost all restaurants too, of North India. My Bhindi Masala Recipe is an easy and delicious Punjabi style preparation, which is also vegan, gluten-free and quite wholesome.",
      title: "Bhindi Masala",
      photo: "bhindi-masala",
      chefID: "655ce2b8b34626526079aa56",
      __v: 0,
    },
    {
      _id: "233f997390e675518e02e941",
      ingredients: ["Paneer", "Tomatoes", "Onions"],
      description:
        "This restaurant style Paneer Tikka Masala recipe is brimming with bright flavors from the spiced and creamy tomato onion curry gravy/sauce and delightfully marinated grilled cottage cheese. While this dish may be considered a labor of love, the time and effort are well worth it! This delicious traditional Punjabi dish is something the whole family will love. Make it for dinner tonight and serve with a pile of naan, roti, or paratha. I can almost guarantee the whole family will clean their plates!",
      title: "Paneer Tikka Masala",
      photo: "paneer-tikka-masala",
      chefID: "115ce2b8b34626526079aa56",
      __v: 0,
    },
  ];

  var recipeDataX = [];
  Object.keys(messageX).forEach(function (key) {
    recipeDataX.push(messageX[key]);
  });
  console.log("recipe data");
  console.log(recipeDataX);

  return (
    <>
      <div className="cardsContainer">
        <div className="row">
          {recipeDataX.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipeCards;
