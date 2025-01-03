require("dotenv").config();
const express = require("express");
const cors = require("cors");
const getDocumentHandler = require("./infrastructure/socket/handlers/documents/document.handler");
const { connectRedis } = require("./infrastructure/database/redis/redis-connection");
const { documentChangesSubscriber } = require("./infrastructure/database/redis/subscribers/documents/document-changes.subscriber");
const { cursorChangesSubscriber } = require("./infrastructure/database/redis/subscribers/cursors/cursor-changes.subscriber");

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

documentChangesSubscriber(io);
cursorChangesSubscriber(io);

io.on("connection", (socket) => {
  getDocumentHandler(io, socket);
});