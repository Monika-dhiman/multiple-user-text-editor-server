const { cursorChangesPublisher } = require("../../database/redis/publishers/cursors/cursors-changes.publisher");
const { documentChangesPublisher } = require("../../database/redis/publishers/documents/document-changes.publisher");
const { getUsers, removeUser, addUser } = require("../handlers/users/users.handler");

const handleGetDocument = async (socket, documentService, documentId) => {
  try {
    const document = await documentService.findOneOrCreateDocument(documentId);
    socket.documentId = documentId;

    const user = addUser(documentId, socket.id);

    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.emit("update-cursors", getUsers(documentId));

    socket.broadcast.to(documentId).emit("user-connected", {
      id: socket.id,
      cursor: user.cursor,
      color: user.color,
      name: user.name,
    });
  } catch (error) {
    console.error(error.message);
  }
};

const handleSendChanges = (socket, documentId, delta) => {
  documentChangesPublisher(documentId, delta, socket.id);
};

const handleSaveDocument = async (documentService, documentId, data) => {
  await documentService.findOneAndUpdateDocument(documentId, data);
};

const handleUpdateCursor = (socket, documentId, cursor) => {
  const user = getUsers(documentId)[socket.id];
  if (user) {
    user.cursor = cursor;
    cursorChangesPublisher(documentId, cursor, socket.id);
  }
};

const handleDisconnect = (io, socket) => {
  const { documentId } = socket;

  if (documentId) {
    removeUser(documentId, socket.id);
    io.to(documentId).emit("user-disconnected", socket.id);
  }

  console.log("user disconnected", socket.id);
};

module.exports = {
  handleGetDocument,
  handleSendChanges,
  handleSaveDocument,
  handleUpdateCursor,
  handleDisconnect,
};