const mongoose = require("mongoose");
const commentServices = require("../services/commentService");
const recepieServices = require("../services/recepieService");

async function createComment(req, res) {
  const { message } = req.body;
  const userId = req.user._id;
  if(!req.params.recepieId) {
    return res.status(500).json({ error: "No reference to recepieId" });
  }
  const recipe = req.params.recepieId;
  const recipeExist = !(await recepieServices.getRecepieById(recipe))
  
  if(recipeExist) {
    return res.status(500).json({error: "Recipe doesn't exist"})
  } 

  try {
    const newComment = await commentServices.createComment(
      message,
      userId,
      recipe
    );
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getComments(req, res) {
  try {
    const comments = await commentServices.getComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCommentById(req, res) {
  const commentId = req.params.id;
  try {
    const comment = await commentServices.getCommentById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCommentByRecepie(req,res){
  try{
    const comments = await commentServices.getCommentsForRecepie(req.params.recepieId)
    if (!comments){
      return res.status(200).json({ message: "Comments not found ror given recepie" });
    }
    res.status(200).json(comments);
  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
}

// async function updateComment(req, res) {
//   const { commentId } = req.params;
//   const updatedFields = req.body;
//   try {
//     const updatedComment = await commentServices.updateComment(commentId, updatedFields);
//     if (!updatedComment) {
//       return res.status(404).json({ error: 'Comment not found' });
//     }
//     res.status(200).json(updatedComment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

async function deleteComment(req, res) {
  const commentId = req.params.id;
  try {
    const comment = await commentServices.getCommentById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const checkAccessibility = (userId) => {
      console.log(userId)
      return comment.userId == userId 
    };

    console.log(req.user.role != "Admin");
    console.log(checkAccessibility(req.user._id))
    if (
      req.user.role != "Admin" &&
      !checkAccessibility(req.user._id)
    ) {
      
      return res
        .status(404)
        .json({ error: "User is not the rightful owner of the comment" });
    }

    const deletedComment = await commentServices.deleteComment(commentId);
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createComment,
  getComments,
  getCommentById,
  // updateComment,
  deleteComment,
  getCommentByRecepie
};
