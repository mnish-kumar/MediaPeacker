const jwt = require('jsonwebtoken');
const userModel = require('../models/UserSchema.js');

// Middleware to check if user is authenticated
const authenticateUser = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ 
                message: 'Access denied. Please login to continue.' 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Find user by ID from token
        const user = await userModel.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found. Please login again.' 
            });
        }

        // Attach user to request object for use in subsequent middleware/routes
        req.user = user;
        
        next(); // Continue to next middleware or route handler
        
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                message: 'Invalid token. Please login again.' 
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Token expired. Please login again.' 
            });
        }
        
        console.error('Authentication middleware error:', error);
        return res.status(500).json({ 
            message: 'Server error during authentication.' 
        });
    }
};

// Middleware for optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await userModel.findById(decoded.id).select('-password');
            if (user) {
                req.user = user;
            }
        }
        
        next(); // Continue regardless of authentication status
        
    } catch (error) {
        // Continue without authentication if there's an error
        next();
    }
};

module.exports = {
    authenticateUser,
    optionalAuth
};