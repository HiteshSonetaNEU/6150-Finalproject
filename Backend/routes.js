const express = require('express');
const router = express.Router();
const { login, register, logout, getUser, checkAuthenticated, checkNotAuthenticated } = require('./controllers/userController');

router.post('/login', checkNotAuthenticated, login);
router.post('/register', checkNotAuthenticated, register);
router.get('/logout', checkAuthenticated, logout);
router.get('/', checkAuthenticated, getUser);

module.exports = router;
