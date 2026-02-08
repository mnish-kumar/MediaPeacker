const express = require('express');
const authRoutes = require('./routes/user.auth');

const app =  express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

module.exports = app;