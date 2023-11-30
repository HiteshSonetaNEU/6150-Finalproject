import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import imgX from "../Images/Home/bhindi-masala.jpg";

const RecipeModal = ({ show, handleClose, chefData }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {chefData ? chefData.title : "Recipe Details"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {chefData ? (
          <>
            <img src={imgX} alt={chefData.title} style={{ maxWidth: "100%" }} />
            <p>{chefData.description}</p>
          </>
        ) : (
          <p>No recipe details available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeModal;
