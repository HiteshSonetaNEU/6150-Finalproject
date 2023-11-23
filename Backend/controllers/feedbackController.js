const feedbackServices = require('../services/feedbackService');

async function createFeedback(req, res) {
  const feedbackData = req.body;
  try {
    const newFeedback = await feedbackServices.createFeedback(feedbackData);
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getFeedbacks(req, res) {
  try {
    const feedbacks = await feedbackServices.getFeedbacks();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getFeedbackById(req, res) {
  const feedbackId = req.params.id;
  try {
    const feedback = await feedbackServices.getFeedbackById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// async function updateFeedback(req, res) {
//   const { feedbackId } = req.params;
//   const updatedFields = req.body;
//   try {
//     const updatedFeedback = await feedbackServices.updateFeedback(feedbackId, updatedFields);
//     if (!updatedFeedback) {
//       return res.status(404).json({ error: 'Feedback not found' });
//     }
//     res.status(200).json(updatedFeedback);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

async function deleteFeedback(req, res) {
  const feedbackId  = req.params.id;
  try {
    if(req.user.role != "Admin") {
      return res.status(404).json({ error: 'Only Admin has access for this operation' });
    }
    const deletedFeedback = await feedbackServices.deleteFeedback(feedbackId);
    if (!deletedFeedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.status(200).json(deletedFeedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedbackById,
  // updateFeedback,
  deleteFeedback,
};
