const { dropTestDatabase } = require("../db");

module.exports = async function () {
  await dropTestDatabase();
};
