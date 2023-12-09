const express = require("express");
const router = express.Router();

const {
  checkNotAuthenticated,
  checkAuthenticated,
} = require("../controllers/userController");
const {
  createComment,
  getComments,
  getCommentById,
  deleteComment,
  getCommentByRecepie
} = require("../controllers/commentController");

router.post("/create/:recepieId", checkAuthenticated, createComment);
router.get("/get", checkAuthenticated, getComments);
router.delete("/:id", checkAuthenticated, deleteComment);
router.get("/:id", checkAuthenticated, getCommentById);
router.get("/get/:recepieId",checkAuthenticated,getCommentByRecepie)

module.exports = router;
