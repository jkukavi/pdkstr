import { MongoMemoryServer, MongoBinary } from "mongodb-memory-server-core";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

export = async function globalSetup() {
  const instance = await MongoMemoryServer.create();

  const binaryPath = await MongoBinary.getPath(instance.opts.binary);

  const uri = instance.getUri().split("://")[1].slice(0, -1);
  (global as any).__MONGOINSTANCE = instance;
  process.env.LOCAL_MONGODB_URL = uri;
  console.log(
    chalk.green(
      `
      
This test is using an in-memory mongoDb instance from mongodb-memory-server.(see file: globalSetup.ts)
Binary was located at: ${binaryPath}
      `
    )
  );
};
