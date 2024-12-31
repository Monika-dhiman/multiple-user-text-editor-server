const { redisSubscriber, redisPublisher } = require("./redis-connection");


const PUB_SUB_CHANNEL = "document_changes";

// Subscribe to changes
const subscribeToChanges = (callback) => {
  redisSubscriber.subscribe(PUB_SUB_CHANNEL, (message) => {
    const data = JSON.parse(message);
    callback(data);
  });
};

// Publish changes
const publishChanges = (documentId, delta) => {
  const message = JSON.stringify({ documentId, delta });
  redisPublisher.publish(PUB_SUB_CHANNEL, message);
};

module.exports = { subscribeToChanges, publishChanges };
