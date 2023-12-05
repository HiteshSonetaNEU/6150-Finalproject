const { Comment } = require('../models/commentModel');

async function createComment(message, userId, recepieId) {

  try {
    const comment = new Comment({ message, userId, recepieId });
    const savedComment = await comment.save();
    return savedComment;
  } catch (error) {
    throw error;
  }
}

async function getComments() {
  try {
    const comments = await Comment.find();
    return comments;
  } catch (error) {
    throw error;
  }
}

async function getCommentById(commentId) {
  try {
    const comment = await Comment.findById(commentId);
    return comment;
  } catch (error) {
    throw error;
  }
}

// async function updateComment(commentId, updatedFields) {
//   try {
//     const updatedComment = await Comment.findByIdAndUpdate(commentId, updatedFields, { new: true });
//     return updatedComment;
//   } catch (error) {
//     throw error;
//   }
// }

async function deleteComment(commentId) {
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    return deletedComment;
  } catch (error) {
    throw error;
  }
}

async function getCommentsForRecepie(id){
  try{
    const recepieId= new mongoose.Types.ObjectId(id)
    return( await Comment.find({recepieId}))
  }
  catch(error){
    throw error;
  }
}

module.exports = {
  createComment,
  getComments,
  getCommentById,
  deleteComment,
  getCommentsForRecepie
};
