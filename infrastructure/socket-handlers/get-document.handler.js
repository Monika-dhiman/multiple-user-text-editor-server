const { documentService } = require("../../features/documents/documents.service");
const redisClient = require("../database/redis-connection/redis-connection");

const users = {};
const REDIS_KEY_PREFIX = "document:";
const REDIS_TTL = 60 * 60 * 24; // 24 hours
module.exports = async (io, socket) => {
  socket.on("get-document", async (documentId) => {
    try {
      // const documentdjfks = await documentService.findOneOrCreateDocument(
      //   documentId
      // );
      let document = await redisClient.get(`${REDIS_KEY_PREFIX}${documentId}`);
      console.log("document JDKDKJGDKJGKDFJ", JSON.parse(document));
      if (!document) {
        document = await documentService.findOneOrCreateDocument(documentId);
        await redisClient.set(
          `${REDIS_KEY_PREFIX}${documentId}`,
          JSON.stringify(document),
          { EX: 60 * 60 * 24 }
        );
      }
      socket.documentId = documentId;

      if (!users[documentId]) {
        users[documentId] = {};
      }

      users[documentId][socket.id] = {
        cursor: null,
        color: generateCursorColor(),
        name: `User-${socket.id.slice(0, 5)}`,
      };

      socket.join(documentId);
      console.log("document.data", JSON.parse(document));
      socket.emit("load-document", typeof(document) === "string" ? JSON.parse(document) : document.data);

      // Send existing cursors to the new user
      socket.emit("update-cursors", users[documentId]);

      // Notify all other users about the new user's cursor
      socket.broadcast.to(documentId).emit("user-connected", {
        id: socket.id,
        cursor: users[documentId][socket.id].cursor,
        color: users[documentId][socket.id].color,
        name: users[documentId][socket.id].name,
      });
    } catch (error) {
      console.error(error.message);
    }

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
      redisClient.set(`${REDIS_KEY_PREFIX}${documentId}`, JSON.stringify(delta));
    });

    socket.on("save-document", async (data) => {
      await documentService.findOneAndUpdateDocument(documentId, { data });
      const redisSEt = await redisClient.set(`${REDIS_KEY_PREFIX}${documentId}`, JSON.stringify(data));
      console.log(redisSEt)
    });

    // Handle cursor updates
    socket.on("update-cursor", (cursor) => {
      if (users[documentId] && users[documentId][socket.id]) {
        users[documentId][socket.id].cursor = cursor;

        // Broadcast the cursor update to all other users
        socket.broadcast.to(documentId).emit("cursor-updated", {
          id: socket.id,
          cursor,
        });
      }
    });
    socket.on("disconnect", () => {
      const { documentId } = socket;

      if (documentId && users[documentId]) {
        delete users[documentId][socket.id];

        // Notify remaining users in the document room
        io.to(documentId).emit("user-disconnected", socket.id);

        // Clean up if no users are left in the document
        if (Object.keys(users[documentId]).length === 0) {
          delete users[documentId];
        }
      }
      console.log("user disconnected", socket.id);
    });
  });
};

const generateCursorColor = () => {
  const randomColor = () =>
    Math.floor(Math.random() * 128 + 128)
      .toString(16)
      .padStart(2, "0");
  return `#${randomColor()}${randomColor()}${randomColor()}`;
};
