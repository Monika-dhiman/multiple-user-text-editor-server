const { generateCursorColor } = require("./cursor-colors/cursor-colors");

const users = {};

const addUser = (documentId, socketId) => {
  if (!users[documentId]) {
    users[documentId] = {};
  }

  users[documentId][socketId] = {
    cursor: null,
    color: generateCursorColor(),
    name: `User-${socketId.slice(0, 5)}`,
  };

  return users[documentId][socketId];
};

const removeUser = (documentId, socketId) => {
  if (users[documentId]) {
    delete users[documentId][socketId];

    if (Object.keys(users[documentId]).length === 0) {
      delete users[documentId];
    }
  }
};

const getUsers = (documentId) => {
  return users[documentId] || {};
};

module.exports = { addUser, removeUser, getUsers };