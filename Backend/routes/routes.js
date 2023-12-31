const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  getUser,
  getChefs,
  followChef,
  unFollowChef,
  getUserById,
  checkAuthenticated,
  checkNotAuthenticated,
  search,
  updateUser,
} = require("../controllers/userController");

router.post("/login", checkNotAuthenticated, login);
router.post("/register", checkNotAuthenticated, register);
router.get("/logout", checkAuthenticated, logout);
router.get("/", checkAuthenticated, getUser);
router.get("/user/follow/:id", checkAuthenticated, followChef);
router.get("/user/unfollow/:id", checkAuthenticated, unFollowChef);
router.get("/user/chef/", checkAuthenticated, getChefs);
router.get("/user/search/:query", checkAuthenticated, search);
router.get("/user/:id", checkAuthenticated, getUserById);
router.post("/user/update", checkAuthenticated, updateUser);
module.exports = router;
