const { Feedback } = require('../models/feedbackModel');

async function createFeedback(data) {
  try {
    const feedback = new Feedback(data);
    const savedFeedback = await feedback.save();
    return savedFeedback;
  } catch (error) {
    throw error;
  }
}

async function getFeedbacks() {
  try {
    const feedbacks = await Feedback.find();
    return feedbacks;
  } catch (error) {
    throw error;
  }
}

async function getFeedbackById(feedbackId) {
  try {
    const feedback = await Feedback.findById(feedbackId);
    return feedback;
  } catch (error) {
    throw error;
  }
}

async function updateFeedback(feedbackId, updatedFields) {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, updatedFields, { new: true });
    return updatedFeedback;
  } catch (error) {
    throw error;
  }
}

async function deleteFeedback(feedbackId) {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);
    return deletedFeedback;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
};
