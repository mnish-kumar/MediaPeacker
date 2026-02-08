const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userAuth.controler.js');
const { authenticateUser } = require('../middlewares/auth.middleware.js');

// User Registration
router.post('/register', (req, res) => {
    registerUser(req, res);
});


// User Login
router.post('/login', async (req, res) => {
    loginUser(req, res);
});

// User profile (protected route - requires authentication)
router.get('/profile', authenticateUser, (req, res) => {
    getUserProfile(req, res);
});


module.exports = router;