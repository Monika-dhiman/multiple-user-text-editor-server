const { handleGetDocument, handleSendChanges, handleSaveDocument, handleUpdateCursor, handleDisconnect } = require("../../socket-events/socket-events.handler");
const {documentService} = require("../../../../features/documents/documents.service");

module.exports = async (io, socket) => {
  socket.on("get-document", async (documentId) => {
    await handleGetDocument(socket, documentService, documentId);
  });

  socket.on("send-changes", (delta) => {
    handleSendChanges(socket, socket.documentId, delta);
  });

  socket.on("save-document", async (data) => {
    await handleSaveDocument(documentService, socket.documentId, data);
  });

  socket.on("update-cursor", (cursor) => {
    handleUpdateCursor(socket, socket.documentId, cursor);
  });

  socket.on("disconnect", () => {
    handleDisconnect(io, socket);
  });
};