const documentRepository = require("./infrastructure/repositories/document/document.repository");

require("dotenv").config();

//database connection
require("./infrastructure/database/mongo-db-connection");

const io = require("socket.io")(8080, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const users = {};
io.on("connection", (socket) => {
  //   console.log("new user connected", socket.id);

  socket.on("get-document", async (documentId) => {
    const document = await findOneOrCreateDocument(documentId);

    socket.documentId = documentId;

    if (!users[documentId]) {
      users[documentId] = {};
    }

    users[documentId][socket.id] = {
      cursor: null,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      name: `User-${socket.id.slice(0, 5)}`, // Assign a unique name
    };

    socket.join(documentId);
    socket.emit("load-document", document.data);

    // Send existing cursors to the new user
    socket.emit("update-cursors", users[documentId]);

    // Notify all other users about the new user's cursor
    socket.broadcast.to(documentId).emit("user-connected", {
      id: socket.id,
      cursor: users[documentId][socket.id].cursor,
      color: users[documentId][socket.id].color,
      name: users[documentId][socket.id].name,
    });

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await findOneAndUpdateDocument(documentId, { data });
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

  const findOneOrCreateDocument = async (id) => {
    if (id == null) return;
    const document = await documentRepository.findDocumentById({ _id: id });
    if (document) return document;
    return await documentRepository.createDocument({ _id: id, data: "" });
  };

  const findOneAndUpdateDocument = async (id, data) => {
    return await documentRepository.updateDocument({ _id: id }, data);
  };
});
