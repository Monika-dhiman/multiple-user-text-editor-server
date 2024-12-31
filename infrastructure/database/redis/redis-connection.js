const redis = require("redis");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
const redisPublisher = redisClient.duplicate();
const redisSubscriber = redisClient.duplicate();

const connectRedis = async () => {
  try {
    await Promise.all([
      redisClient.connect(),
      redisPublisher.connect(),
      redisSubscriber.connect(),
    ]);
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    process.exit(1);
  }
};

// Verify connection
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

redisPublisher.on("error", (err) => {
  console.error("Redis Publisher Error", err);
});

redisSubscriber.on("error", (err) => {
  console.error("Redis Subscriber Error", err);
});

module.exports = { redisClient, redisPublisher, redisSubscriber, connectRedis };
