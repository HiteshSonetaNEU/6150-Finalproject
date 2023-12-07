import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { WithContext as ReactTags } from "react-tag-input";
import "../Styles/EditRecipeModal.css";

const EditRecipeModal = ({ show, handleClose, chefData, onEditRecipe }) => {
  const [editedRecipe, setEditedRecipe] = useState({
    title: chefData.title || "",
    description: chefData.description || "",
    ingredients: chefData.ingredients || [],
    photo: chefData.photo || "",
  });

  useEffect(() => {
    setEditedRecipe({
      title: chefData.title || "",
      description: chefData.description || "",
      ingredients: chefData.ingredients || [],
      photo: chefData.photo || "",
    });
  }, [chefData]);

  const handleDelete = (i) => {
    setEditedRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients.splice(i, 1); // Remove the ingredient at index i
      return { ...prevRecipe, ingredients: updatedIngredients };
    });
  };

  const handleAddition = (tagText) => {
    // Check if the tagText already exists in ingredients
    const tagExists = editedRecipe.ingredients.includes(tagText);

    if (!tagExists) {
      setEditedRecipe((prevRecipe) => {
        return {
          ...prevRecipe,
          ingredients: [...prevRecipe.ingredients, tagText],
        };
      });
    }
  };

  const handleInputChange = (e) => {
    setEditedRecipe({
      ...editedRecipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleTagsChange = (suggestions) => {
    console.log("Change");
    console.log(suggestions);
    if (Array.isArray(suggestions)) {
      setEditedRecipe((prevRecipe) => {
        const newIngredients = suggestions.map((tag, index) => ({
          id: (index + prevRecipe.ingredients.length).toString(),
          text: tag.text,
        }));

        return {
          ...prevRecipe,
          ingredients: [...prevRecipe.ingredients, ...newIngredients],
        };
      });
    }
  };

  const handleSubmitEdit = () => {
    // Validate and send edited recipe to the parent component
    if (validateForm()) {
      onEditRecipe(chefData._id, editedRecipe);
      handleClose();
    }
  };

  const validateForm = () => {
    // Add any additional validation logic here
    // Return true if the form is valid, otherwise false
    return true;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="editRecipeModalContainer">
          <label className="modaltitlelabel">Title</label>
          <input
            type="text"
            name="title"
            value={editedRecipe.title}
            onChange={handleInputChange}
          />
          <label className="modaltitlelabel">Recipe</label>
          <textarea
            name="description"
            value={editedRecipe.description}
            onChange={handleInputChange}
          ></textarea>
          <label className="modaltitlelabel IngredientsModal">
            Ingredients
          </label>
          <ReactTags
            key={editedRecipe.ingredients.length} // Add a key prop
            tags={editedRecipe.ingredients.map((ingredient, index) => ({
              id: index.toString(), // Convert index to string
              text: ingredient,
            }))}
            handleDelete={handleDelete}
            handleAddition={(tag) => handleAddition(tag.text)}
            handleInputChange={handleTagsChange}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary btn-dark" onClick={handleSubmitEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditRecipeModal;
