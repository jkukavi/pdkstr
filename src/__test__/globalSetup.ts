import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";

dotenv.config();

export = async function globalSetup() {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri().split("://")[1].slice(0, -1);
  (global as any).__MONGOINSTANCE = instance;
  process.env.LOCAL_MONGODB_URL = uri;
  const dva = "la";
};
