import { MongoMemoryServer } from "mongodb-memory-server-core";
import chalk from "chalk";

export = async function globalTeardown() {
  const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
  await instance.stop();
  console.log(
    chalk.green("\nIn memory database closed. (see file: globalTeardown.ts)\n")
  );
};
