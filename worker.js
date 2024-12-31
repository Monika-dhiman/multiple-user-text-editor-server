// const { documentService } = require("./features/documents/documents.service");
// subscribeToChanges(async (data) => {
//   console.log(`Saving document ${data.documentId} to MongoDB`);
//   await documentService.findOneAndUpdateDocument(data.documentId);

const getDocumentHandler = require("./infrastructure/socket-handlers/get-document.handler");

// });
const onConnection = (io,socket) => {
  console.log("Connected to socket");
  getDocumentHandler(io, socket);
};

module.exports = { onConnection };