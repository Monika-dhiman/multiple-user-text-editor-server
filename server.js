require("dotenv").config();
const express = require("express");
const cors = require("cors");
const getDocumentHandler = require("./infrastructure/socket-handlers/get-document.handler");
const {
  connectRedis,
} = require("./infrastructure/database/redis/redis-connection");
const {
  subscribeToChanges,
} = require("./infrastructure/database/redis/pub-sub");

//database connection
require("./infrastructure/database/mongo-db-connection/mongo-db-connection");

const app = express();
const server = app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/", require("./features"));

connectRedis();

const io = require("socket.io")(server, {
  cors: corsOptions,
});

subscribeToChanges(async (data) => {
  const socket = io.sockets.sockets.get(data.socketId);
  if (socket) {
    await socket.broadcast.to(data.documentId).emit("receive-changes", data.delta);
  }
});

io.on("connection", (socket) => {
  getDocumentHandler(io, socket);
});
