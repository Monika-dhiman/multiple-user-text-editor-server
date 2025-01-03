const { redisPublisher } = require("../../redis-connection");

const documentChangesPublisher = (documentId, delta, socketId) => {
  const message = JSON.stringify({ documentId, delta, socketId });
  redisPublisher.publish(process.env.REDIS_PUB_SUB_DOCUMENT_CHANNEL, message);
};

module.exports = { documentChangesPublisher };