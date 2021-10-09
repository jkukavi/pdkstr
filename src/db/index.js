const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.

const prodUri = `mongodb+srv://podkaster:${process.env.MONGODB_PASS}@pkcluster.crvpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const localUri = "mongodb://192.168.5.11:27017";

const uri = process.env.NODE_ENV === "production" ? prodUri : localUri;

const client = new MongoClient(uri, {
  socketTimeoutMS: 1000,
  connectTimeoutMS: 1000,
  serverSelectionTimeoutMS: 1000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

async function startClient() {
  _db = await client.connect();
  console.log("DB client connected");
}

function get() {
  return _db;
}

async function doSth(cb) {
  try {
    await client.connect();
    const db = await client.db("podkaster");
    console.log("clientOpened");
    const response = await cb(db);
    console.log("db operation successful");
    return response;
  } finally {
    await client.close();
    console.log("clientClosed");
  }
}

async function closeConnection() {
  await _db.close();
}

module.exports = {
  startClient,
  doSth,
  get,
  closeConnection,
};
