import { doSth } from "db";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

async function save(user) {
  return doSth(async (db) => {
    return await db.collection("users").insertOne(user);
  });
}

async function findById(id) {
  return doSth(async (db) => {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    return user;
  });
}

async function removeById(id) {
  return doSth(async (db) => {
    return await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  });
}

async function findByCredentials({ email, password }) {
  return doSth(async (db) => {
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      throw new Error("Unable to authenticate.");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Unable to authenticate.");
    }
    return user;
  });
}

async function getMyHistory(id) {
  return doSth(async (db) => {
    const { history } = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) }, { projection: { history: 1 } });
    return history;
  });
}

async function getMyFavourites(id) {
  return doSth(async (db) => {
    const { favourites } = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) }, { projection: { favourites: 1 } });
    return favourites;
  });
}

async function addItemToHistory(id, item) {
  return doSth(async (db) => {
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

async function addItemToFavourites(id, item) {
  return doSth(async (db) => {
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