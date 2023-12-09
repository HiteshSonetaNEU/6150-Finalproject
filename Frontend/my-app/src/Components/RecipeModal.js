import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import imgX from "../Images/Home/bhindi-masala.jpg";
import axios from "axios";

const RecipeModal = ({
  show,
  handleClose,
  chefData,
  comments,
  setComments,
  userID,
  currentUserRole,
}) => {
  const [newComment, setNewComment] = useState("");

  // console.log("COMMENTS");
  // console.log(comments.length);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/comment/create/${chefData._id}`,
        {
          message: newComment,
        },
        {
          withCredentials: true,
        }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      // console.log(error);
    }
  };
  // console.log(userID);

  const handleDeleteComment = async (commentID) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/comment/${commentID}`,
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        const deletedCommentIndex = comments.findIndex(
          (comment) => comment._id === commentID
        );

        if (deletedCommentIndex !== -1) {
          const updatedComments = [
            ...comments.slice(0, deletedCommentIndex),
            ...comments.slice(deletedCommentIndex + 1),
          ];

          setComments(updatedComments);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  var recipeImage = "http://localhost:3001/api/images/" + chefData.photo;
  if (chefData.photo === undefined) {
    recipeImage = imgX;
  }

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
              src={recipeImage}
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
            <h5 className="commentsHeader">Comments:</h5>
            {comments.length > 0 ? (
              <ul>
                {comments.map((comment) => (
                  <li className="commentBodyList" key={comment._id}>
                    {comment.message}
                    {(userID === comment.userId ||
                      currentUserRole === "Admin") && (
                      <Button
                        variant="danger"
                        className="commentDeleteButton"
                        onClick={() => handleDeleteComment(comment._id)}>
                        Delete
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments available.</p>
            )}

            <div>
              <input
                className="commentInputField"
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <Button variant="primary btn-dark" onClick={handleAddComment}>
                Add Comment
              </Button>
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
