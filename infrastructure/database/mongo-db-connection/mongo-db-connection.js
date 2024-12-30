const mongoose = require("mongoose");

mongoose.connect(process.env.DB_DSN, {
  dbName: process.env.DB_DATABASE,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected.");
});

mongoose.connection.on("disconnected", (err) => {
  console.log("Mongoose connection is disconnected.", err);
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = mongoose;
