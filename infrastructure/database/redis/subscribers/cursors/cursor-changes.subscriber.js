const { broadcastCursorChanges } = require("../../../../socket/socket-broadcasts/socket-broadcast");
const { redisSubscriber } = require("../../redis-connection");

const cursorChangesSubscriber = async (io) => {
  redisSubscriber.subscribe(process.env.REDIS_PUB_SUB_CURSOR_CHANNEL, async (message) => {
    const data = JSON.parse(message);
    await broadcastCursorChanges(io, data);
  });
};

module.exports = { cursorChangesSubscriber };