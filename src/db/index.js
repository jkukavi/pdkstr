const { MongoClient } = require("mongodb");
const config = require("./config");

const client = new MongoClient(config.uri, config.options);

let db;
let testDb;

function initDatabases() {
  db = client.db(config.dbName);
  testDb = client.db("test");
}

async function connect() {
  await client.connect();
  initDatabases();
}

async function close() {
  await client.close();
}

async function doSth(cb) {
  const response = await cb(db);
  return response;
}

async function dropTestDatabase() {
  await connect();
  await testDb.dropDatabase();
  await close();
}

module.exports = {
  doSth,
  dropTestDatabase,
  connect,
  close,
};
