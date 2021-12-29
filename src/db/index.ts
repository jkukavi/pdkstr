import { Db, MongoClient } from "mongodb";
import * as config from "./config";

const client = new MongoClient(config.uri, config.options);

let db: Db;
let testDb: Db;

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

async function useDatabase<T>(cb: (db: Db) => Promise<T | null>) {
  return await cb(db);
}

async function dropTestDatabase() {
  await connect();
  await testDb.dropDatabase();
  await close();
}

export { useDatabase, dropTestDatabase, connect, close };
