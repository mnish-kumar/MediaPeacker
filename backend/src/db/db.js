const mongoose = require('mongoose');

function connectToDatabase() {
    mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Connected database successfully ✅');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    })
}

module.exports = connectToDatabase;