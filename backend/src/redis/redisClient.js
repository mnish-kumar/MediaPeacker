// const redis = require("redis");

// const redisClient = redis.createClient({
//     url: process.env.REDIS_URL || "redis://localhost:6379",
// });

// // Connect to Redis with better error handling
// const connectRedis = async () => {
//     try {
//         await redisClient.connect();
//         console.log("Connected to Redis ✅");
//     } catch (err) {
//         console.error("Redis connection error:", err);
//     }
// };

// redisClient.on("error", (err) => {
//     console.error("Redis connection error:", err);
// });

// redisClient.on("ready", () => {
//     console.log("Redis client ready to use");
// });

// // Initialize connection
// connectRedis();

// module.exports = redisClient;