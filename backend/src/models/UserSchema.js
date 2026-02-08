const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        firstName: { type: String, required: true, minlength: 3 }, 
        lastName: { type: String }
    },

    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, 'Password must be at least 6 characters long']
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    }
}, 
{ timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        ;
    } catch (error) {
        console.error('Error hashing password:', error);
    }
});

// compare password method
userSchema.methods.candidatePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;