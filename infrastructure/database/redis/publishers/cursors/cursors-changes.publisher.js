const { redisPublisher } = require("../../redis-connection");

const cursorChangesPublisher = (documentId, cursor, socketId) => {
  const message = JSON.stringify({ documentId, cursor, socketId });
  redisPublisher.publish(process.env.REDIS_PUB_SUB_CURSOR_CHANNEL, message);
};

module.exports = { cursorChangesPublisher };
