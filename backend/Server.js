require('dotenv').config();
const app = require('./src/app');
const connectToDatabase = require('./src/db/db');
// const redisClient = require('./src/redis/redisClient');

// Connect to the database
connectToDatabase();


app.listen(3000, () => {
    console.log('Server is running on port 3000 🚀');
})