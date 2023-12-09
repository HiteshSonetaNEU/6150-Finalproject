import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WithContext as ReactTags } from "react-tag-input";
import Accordion from "react-bootstrap/Accordion";
import EditRecipeModal from "./EditRecipeModal";
import "../Styles/Recipe.css";

import Header from "./Header.js";
import Footer from "./Footer.js";
import RecipeCardsUser from "./RecipeCardsUser.js";

function Recipe() {
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [userID, setUserId] = useState("");
  const [titleError, setTitleError] = useState("");
  const [tagsError, setTagsError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [userRecipes, setUserRecipes] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const navigate = useNavigate();

  const onSubmitRecipe = async () => {
  
    let ingredients = tags.map((tag) => tag.text);

    let obj1 = {
      ingredients,
      description,
      title,
    };

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:3001/recepie/create",
          obj1,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setUserRecipes(response.data);

        if (response.status === 201) {
          alert("Recipe submitted");
          setTags([]);
          setDescription("");
          setTitle("");
          // window.location.reload();
          // alert("Now click on edit and change the image of the recipe.");
          document
            .getElementById("RecipeModalView" + response.data._id)
            .click();
        } else {
          console.error(
            "Error in creating the recipe. Server responded with:",
            response.data
          );
        }
      } catch (error) {
        console.log(error);
        console.error("Error in submitting the recipe!", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitRecipe();
  };

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError("Title cannot be empty");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (tags.length === 0) {
      setTagsError("Please enter at least one ingredient");
      isValid = false;
    } else {
      setTagsError("");
    }

    if (!description.trim()) {
      setDescriptionError("Description cannot be empty");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/", {
          withCredentials: true,
        });
        // console.log(response.data.id);
        if (response.data.role === "User") {
          navigate("/home");
        }
        setUserId(response.data.id);
        if (response.data.name) {
          // user is logged in
        }
      } catch (error) {
        // console.log(error);
        // user is not logged in
        if (error.response.data.message === "Login first") {
          navigate("/login");
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    checkLoggedInStatus();
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleEditRecipe = (recipeID, editedRecipe) => {
    setUserRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe._id === recipeID ? { ...recipe, ...editedRecipe } : recipe
      )
    );
  };

  return (
    <>
      <Header />
      <div className="recipeBodyContainer">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Create Recipe</Accordion.Header>
            <Accordion.Body>
              <div className="recipe-form-body">
                <form className="row g-3 recipeForm" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <label htmlFor="inputTitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTitle"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Recipe name"
                    />
                    <span className="formErrors">{titleError}</span>
                  </div>

                  <div className="col-12">
                    <label htmlFor="inputDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="inputDescription"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Recipe description"
                    ></textarea>
                    <span className="formErrors">{descriptionError}</span>
                  </div>

                  <div className="col-12">
                    <label htmlFor="inputIngredients" className="form-label">
                      Ingredients
                    </label>
                    <ReactTags
                      tags={tags}
                      handleDelete={(i) =>
                        setTags(tags.filter((tag, index) => index !== i))
                      }
                      handleAddition={(tag) => setTags([...tags, tag])}
                      placeholder="Please enter your ingredients"
                    />
                    <span className="formErrors">{tagsError}</span>
                  </div>

                  {/* <div className="col-12">
                    <label htmlFor="inputPhoto" className="form-label">
                      Photo URL
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPhoto"
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                    />
                  </div> */}

                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button
                      className="btn btn-dark submitRecipeButton"
                      type="submit"
                    >
                      Submit Recipe
                    </button>
                  </div>
                </form>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <h2 className="recipeHeadingYour">Your Recipes</h2>
      </div>
      <RecipeCardsUser
        userID={userID}
        onEditRecipe={handleEditRecipe}
      />
      <Footer />
    </>
  );
}

export default Recipe;
