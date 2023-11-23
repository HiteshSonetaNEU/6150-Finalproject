const express = require("express");
const router = express.Router();
const {
  checkNotAuthenticated,
  checkAuthenticated,
} = require("./controllers/userController");
const {
  createFeedback,
  getFeedbacks,
  getFeedbackById,
  deleteFeedback,
} = require("./controllers/feedbackController");

router.post("/create", checkAuthenticated, createFeedback);
router.get("/get", checkAuthenticated, getFeedbacks);
router.delete("/:id", checkAuthenticated, deleteFeedback);
router.get("/:id", checkAuthenticated, getFeedbackById);

module.exports = router;