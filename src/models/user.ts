import { useDatabase } from "db";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

async function save(user: AccountInfo) {
  return useDatabase(async (db) => {
    return await db.collection("users").insertOne(user);
  });
}

async function findById(id: string) {
  return useDatabase(async (db) => {
    return await db
      .collection<AccountInfo>("users")
      .findOne({ _id: new ObjectId(id) });
  });
}

async function removeById(id: string) {
  return useDatabase(async (db) => {
    return await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  });
}

async function findByCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return useDatabase(async (db) => {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    return user;
  });
}

async function getMyHistory(id: string) {
  return useDatabase(async (db) => {
    const { history }: any = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(id) },
        { projection: { history: { $slice: 20 } } }
      );
    return history;
  });
}

async function getMyFavourites(id: string) {
  return useDatabase(async (db) => {
    const { favourites }: any = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(id) },
        { projection: { favourites: { $slice: 20 } } }
      );
    return favourites;
  });
}

async function addItemToHistory(id: string, item: any) {
  return useDatabase(async (db) => {
    const response = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, [
        {
          $set: { history: { $concatArrays: [[item], "$history"] } },
        },
      ]);
    return response;
  });
}

async function addItemToFavourites(id: string, item: any) {
  return useDatabase(async (db) => {
    const response = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, [
        {
          $set: { favourites: { $concatArrays: [[item], "$favourites"] } },
        },
      ]);
    return response;
  });
}

export default {
  save,
  findById,
  removeById,
  findByCredentials,
  getMyHistory,
  getMyFavourites,
  addItemToHistory,
  addItemToFavourites,
};
