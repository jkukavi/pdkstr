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

async function dropTestCollection(collection) {
  const rawCollections = await testDb.listCollections().toArray();
  const collections = rawCollections.map((collection) => collection.name);
  if (collections.includes(collection)) {
    await db.collection(collection).drop();
  }
}

module.exports = {
  doSth,
  dropTestCollection,
  connect,
  close,
};
