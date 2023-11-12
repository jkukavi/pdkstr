import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient, ObjectId } from "mongodb";
import {
  createFavouritesForUser,
  createHistoryForUser,
} from "__test__/createUser";
import {
  hashPasswordIn
} from "models/helpers.ts";

const mongoConfig = {
  instance: {
    port: 27017, // by default choose any free port
    ip: "0.0.0.0",
    dbName: "podkaster", // by default '' (empty string),
    storageEngine: "wiredTiger",
  },
  binary: {
    downloadDir: "./node_modules/mongodb-memory-server/",
    version: "6.0.6",
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

  const userWithHashedPassword = await hashPasswordIn({
    _id: userId,
    username: "dasd",
    password: "žaba",
    email: "mikivela1111@gmail.com",
  })

  await users.insertOne(userWithHashedPassword);

  await db.collection("history").insertMany(usersHistory);
  await db.collection("favourites").insertMany(usersFavourites);

  await connection.close();
};

startLocalDatabase();
