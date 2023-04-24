import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient, ObjectId } from "mongodb";
import {
  createFavouritesForUser,
  createHistoryForUser,
} from "__test__/createUser";

const mongoConfig = {
  instance: {
    port: 27017, // by default choose any free port
    ip: "0.0.0.0",
    dbName: "podkaster", // by default '' (empty string),
    storageEngine: "wiredTiger",
  },
  binary: {
    downloadDir: "./node_modules/mongodb-memory-server/",
    version: "5.0.3",
  },
} as any;

const startLocalDatabase = async () => {
  const mongod = new MongoMemoryServer(mongoConfig);
  await mongod.start();
  const connection = await MongoClient.connect("mongodb://localhost:27017");
  const db = connection.db("podkaster");

  const users = db.collection("users");

  const userId = new ObjectId();

  const usersHistory = createHistoryForUser(userId.toString());
  const usersFavourites = createFavouritesForUser(userId.toString());

  await users.insertOne({
    _id: userId,
    username: "dasd",
    password: "$2b$14$hV/a3tLwxkBJqkzrrAg/memEUlFcTChgx8esTyDoVDgXI.vdb.lOC",
    email: "mikivela1111@gmail.com",
  });

  await db.collection("history").insertMany(usersHistory);
  await db.collection("favourites").insertMany(usersFavourites);

  await connection.close();
};

startLocalDatabase();
