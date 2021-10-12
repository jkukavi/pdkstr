const getRandomCode = () => {
  return require("crypto").randomBytes(25).toString("hex");
};

module.exports = {
  getRandomCode,
};
