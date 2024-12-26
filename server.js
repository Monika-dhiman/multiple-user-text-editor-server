require("dotenv").config();
const express = require("express");
const cors = require("cors");
const getDocumentHandler = require("./infrastructure/socket-handlers/get-document.handler");

//database connection
require("./infrastructure/database/mongo-db-connection");

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

const io = require("socket.io")(server, {
  cors: corsOptions,
});

const onConnection = (socket) => {
  getDocumentHandler(io, socket);
};

io.on("connection", onConnection);
