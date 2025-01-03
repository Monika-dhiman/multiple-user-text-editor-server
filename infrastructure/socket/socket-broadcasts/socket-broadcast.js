const broadcastDocumentChanges = async (io, data) => {
  const socket = io.sockets.sockets.get(data.socketId);
  if (socket) {
    await socket.broadcast
      .to(data.documentId)
      .emit("receive-changes", data.delta);
  }
};

const broadcastCursorChanges = async (io, data) => {
  const socket = io.sockets.sockets.get(data.socketId);
  if (socket) {
    await socket.broadcast.to(data.documentId).emit("cursor-updated", {
      id: data.socketId,
      cursor: data.cursor,
    });
  }
};

module.exports = { broadcastDocumentChanges, broadcastCursorChanges };
