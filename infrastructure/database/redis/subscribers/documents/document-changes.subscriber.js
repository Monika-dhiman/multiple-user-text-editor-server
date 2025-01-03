const { broadcastDocumentChanges } = require("../../../../socket/socket-broadcasts/socket-broadcast");
const { redisSubscriber } = require("../../redis-connection");

const documentChangesSubscriber = async (io) => {
  redisSubscriber.subscribe(process.env.REDIS_PUB_SUB_DOCUMENT_CHANNEL, async (message) => {
    const data = JSON.parse(message);
    await broadcastDocumentChanges(io, data);
  });
};


module.exports = { documentChangesSubscriber };
