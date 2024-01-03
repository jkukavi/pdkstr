import { MongoMemoryServer, MongoBinary } from "mongodb-memory-server-core";
import { MongoClient, ObjectId } from "mongodb";
import chalk from "chalk";
import fs from "fs";

import {
  createFavouritesForUser,
  createHistoryForUser,
  // @ts-ignore
} from "__test__/createUser";
// @ts-ignore
import { hashPasswordIn } from "models/helpers.ts";
import path from "path";
import childProcess from "child_process";

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

  let prodDumpExists = false;

  try {
    const dumpFolderPath = path.join(__dirname, "/scripts/dump");
    fs.readdirSync(dumpFolderPath);
    prodDumpExists = true;
  } catch (e) {
    if (e.code === "ENOENT") {
      prodDumpExists = false;
    }
  }

  if (prodDumpExists) {
    await populateFromDump();
  } else {
    populateFromFixtures();
  }

  log(instanceOptions);

  let finalMessage: string;

  if (prodDumpExists) {
    finalMessage =
      "Successfuly started the in-memory mongodb \ndatabase and populated it with prod dump.";
  } else {
    finalMessage =
      "Successfuly started the in-memory mongodb \ndatabase and populated it with dummy fixtures.";
  }

  console.log(chalk.green(finalMessage));
};

const populateFromDump = async () => {
  await new Promise((res, rej) => {
    const restoreDumpScriptPath = path.join(
      __dirname,
      "/scripts/restoreDump.sh"
    );

    const scriptProcess = childProcess.spawn(restoreDumpScriptPath);

    scriptProcess.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    scriptProcess.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    scriptProcess.on("close", (code) => {
      res(null);
    });
  });
};

const populateFromFixtures = async () => {
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
