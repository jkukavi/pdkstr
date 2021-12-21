import dotenv from "dotenv";

dotenv.config();

const prodUri = `mongodb+srv://podkaster:${process.env.MONGODB_PASS}@pkcluster.crvpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const localUri = `mongodb://${process.env.LOCAL_MONGODB_URL}`;

const uri = process.env.NODE_ENV === "production" ? prodUri : localUri;
const dbName = process.env.NODE_ENV === "test" ? "test" : "podkaster";
const options = {
  socketTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export { uri, dbName, options };
