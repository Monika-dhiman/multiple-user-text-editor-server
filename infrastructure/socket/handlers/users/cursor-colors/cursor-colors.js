const generateCursorColor = () => {
  const randomColor = () =>
    Math.floor(Math.random() * 128 + 128)
      .toString(16)
      .padStart(2, "0");
  return `#${randomColor()}${randomColor()}${randomColor()}`;
};

module.exports = { generateCursorColor };
