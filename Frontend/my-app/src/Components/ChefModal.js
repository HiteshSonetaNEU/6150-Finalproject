import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "../Styles/Chef.css";

import img from "../Images/Home/bhindi-masala.jpg";

function ChefModal({ show, handleClose, chefData }) {
  if (!chefData) {
    return null;
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Recipes by {chefData.fullName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {chefData.recepies.length === 0 && (
          <p>OOPS! The Chef has not created any recepies</p>
        )}
        {chefData.recepies.map((recipe) => (
          <div key={recipe._id} className="recipe-container">
            <img src={img} alt={recipe.title} style={{ maxWidth: "100%" }} />
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <p>
              <b>Ingredients:</b> {recipe.ingredients.join(", ")}
            </p>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChefModal;
