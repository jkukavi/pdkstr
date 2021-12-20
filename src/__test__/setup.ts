import { dropTestDatabase } from "db";

module.exports = async function () {
  try {
    await dropTestDatabase();
  } catch (e) {
    throw new Error(
      "Unable to connect to or set up database as a part of test setup. Check that you have started a local mongoDb database."
    );
  }
};
