const userModel = require('../models/UserSchema.js');
const jwt = require('jsonwebtoken');

// User Registration
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existsignUser = await userModel.findOne({ email});

        if (existsignUser) {
            return res.status(400).json(
                { message: 'User already exists' }
            );
        }

        // Create new user
        const newUser = await userModel.create({
            username:{
                firstName: username.firstName,
                lastName: username.lastName
            },
            email,
            password
        });


        const decoded = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.cookie('token', decoded);

        res.status(201).json({ 
            message: 'User registered successfully',
            user:{
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const isValidMail = await userModel.findOne({ email }).select('+password');
    if (!isValidMail){
        return res.status(401).json({
            message: "Unauthorized user !"
        })
    }

    const passwordValidation = await isValidMail.candidatePassword(password);
    if (!passwordValidation){
        return res.status(401).json({
            message: "Unauthorized user !"
        })
    }

    const token = jwt.sign(
        {id: isValidMail._id},
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d'}
    );

    res.cookie('token', token);

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: isValidMail._id,
            username: isValidMail.username,
            email: isValidMail.email
        }
    });

}

// User Logout
const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: "User logged out successfully"
    });
}

// User Profile
const getUserProfile = async (req, res) => {
    try {
        // User is already authenticated via middleware, available as req.user
        res.status(200).json({ 
            message: 'Profile retrieved successfully',
            user: req.user 
        });
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ 
            message: 'Server error while retrieving profile' 
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile
};