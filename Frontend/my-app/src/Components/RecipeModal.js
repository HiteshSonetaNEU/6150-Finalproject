import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import imgX from "../Images/Home/bhindi-masala.jpg";

const RecipeModal = ({ show, handleClose, chefData }) => {
  console.log(chefData);
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
            <img
              className="modalImageRecipe"
              src={imgX}
              alt={chefData.title}
              style={{ maxWidth: "100%", padding: "0 27.5%" }}
            />
            <p>{chefData.description}</p>
            <div className="specList">
              {chefData.ingredients.length > 0 &&
                chefData.ingredients.map((data, index) => (
                  <div key={data} className="chefSpec">
                    {data}
                  </div>
                ))}
            </div>
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
