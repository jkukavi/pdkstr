const { MongoClient } = require("mongodb");

const prodUri = `mongodb+srv://podkaster:${process.env.MONGODB_PASS}@pkcluster.crvpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const localUri = "mongodb://192.168.5.11:27017";

const uri = process.env.NODE_ENV === "production" ? prodUri : localUri;

const dbName = process.env.NODE_ENV === "test" ? "test" : "podkaster";

const client = new MongoClient(uri, {
  socketTimeoutMS: 1000,
  connectTimeoutMS: 1000,
  serverSelectionTimeoutMS: 1000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;
let testDb;

async function connect() {
  await client.connect();
  db = client.db(dbName);
  testDb = client.db("test");
}

async function close() {
  await client.close();
}

async function doSth(cb) {
  const response = await cb(db);
  return response;
}

async function dropCollection(collection) {
  const rawCollections = await testDb.listCollections().toArray();
  const collections = rawCollections.map((collection) => collection.name);
  if (collections.includes(collection)) {
    await db.collection(collection).drop();
  }
}

module.exports = {
  doSth,
  dropCollection,
  connect,
  close,
};
