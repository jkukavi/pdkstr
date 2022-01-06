import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

export = async function globalSetup() {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri().split("://")[1].slice(0, -1);
  (global as any).__MONGOINSTANCE = instance;
  process.env.LOCAL_MONGODB_URL = uri;
  console.log(
    chalk.green(
      "\n\nThis test is using an in-memory mongoDb instance from mongodb-memory-server.\n(see file: globalSetup.ts)"
    )
  );
};
