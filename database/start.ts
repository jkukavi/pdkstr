import { MongoMemoryServer, MongoBinary } from "mongodb-memory-server-core";
import { MongoClient, ObjectId } from "mongodb";
import chalk from "chalk";

import {
  createFavouritesForUser,
  createHistoryForUser,
  // @ts-ignore
} from "__test__/createUser";
// @ts-ignore
import { hashPasswordIn } from "models/helpers.ts";

type MongoMemoryServerOpts = ConstructorParameters<typeof MongoMemoryServer>[0];

const mongoConfig: MongoMemoryServerOpts = {
  instance: {
    port: 27017, // by default choose any free port
    dbName: "podkaster", // by default '' (empty string),
  },
};

const log = (instanceOptions: string) => {
  console.log(`
Instance options: ${chalk.yellow(instanceOptions)}
${chalk.green("Successfuly started the in-memory mongodb database.")}
`);
};

const startLocalDatabase = async () => {
  const mongod = new MongoMemoryServer(mongoConfig);
  await mongod.start();

  const binaryPath = await MongoBinary.getPath(mongoConfig.binary);
  const uri = mongod.getUri();

  const instanceOptions = JSON.stringify(
    { ...mongod.instanceInfo?.instance.instanceOpts, binaryPath, uri },
    null,
    1
  ).replace(/"|\{|\}/g, "");

  log(instanceOptions);

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
  });

  await users.insertOne(userWithHashedPassword);

  await db.collection("history").insertMany(usersHistory);
  await db.collection("favourites").insertMany(usersFavourites);

  await connection.close();
};

startLocalDatabase();
