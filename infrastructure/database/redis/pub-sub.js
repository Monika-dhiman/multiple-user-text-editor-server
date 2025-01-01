const { redisSubscriber, redisPublisher } = require("./redis-connection");

const PUB_SUB_CHANNEL = "document_changes";

const subscribeToChanges = async (callback) => {
  redisSubscriber.subscribe(PUB_SUB_CHANNEL, async (message) => {
    const data = JSON.parse(message);
    callback(data);
  });
};

const publishChanges = (documentId, delta, socketId) => {
  const message = JSON.stringify({ documentId, delta, socketId });
  redisPublisher.publish(PUB_SUB_CHANNEL, message);
};

module.exports = { subscribeToChanges, publishChanges };