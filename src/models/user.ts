import { useDatabase } from "db";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

async function save(user: UserInfo) {
  return useDatabase(async (db) => {
    const users = db.collection("users");

    return await users.insertOne(user);
  });
}

async function findById(id: string) {
  return useDatabase(async (db) => {
    return await db
      .collection<UserInfo>("users")
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

async function getMyRecentHistory(
  id: string,
  itemType: ItemType,
  search: string,
  page = 0
) {
  return useDatabase(async (db) => {
    const history: any = await db
      .collection("history")
      .find({
        user_id: new ObjectId(id),
        ...(itemType && { "data.type": itemType }),
        ...(search && { "data.title": { $regex: search, $options: "i" } }),
      })
      .sort({ _id: -1 })
      .limit(100)
      .toArray();
    return history.map((item: any) => item.data);
  });
}

async function getMyHistory(
  id: string,
  itemType: ItemType,
  search: string,
  page = 0
) {
  return useDatabase(async (db) => {
    const history: any = await db
      .collection("history")
      .find({
        user_id: new ObjectId(id),
        ...(itemType && { "data.type": itemType }),
        ...(search && { "data.title": { $regex: search, $options: "i" } }),
      })
      .sort({ _id: -1 })
      .skip(0 + 20 * page)
      .limit(20)
      .toArray();
    return history.map((item: any) => item.data);
  });
}

async function getMyFavourites(
  id: string,
  itemType: ItemType,
  search: string,
  page = 0
) {
  return useDatabase(async (db) => {
    const favourites: any = await db
      .collection("favourites")
      .find({
        user_id: new ObjectId(id),
        ...(itemType && { "data.type": itemType }),
        ...(search && { "data.title": { $regex: search, $options: "i" } }),
      })
      .sort({ _id: -1 })
      .skip(0 + 20 * page)
      .limit(20)
      .toArray();
    return favourites.map((item: any) => item.data);
  });
}

async function addItemToHistory(id: string, item: any) {
  return useDatabase(async (db) => {
    const response = await db.collection("history").insertOne({
      user_id: new ObjectId(id),
      data: item,
    });
    return response;
  });
}

async function addItemToFavourites(id: string, item: any) {
  return useDatabase(async (db) => {
    const response = await db.collection("favourites").insertOne({
      user_id: new ObjectId(id),
      data: item,
    });
    return response;
  });
}

async function populateHistoryAndFavourites(history: any, favourites: any) {
  return useDatabase(async (db) => {
    await db.collection("history").insertMany(history);
    await db.collection("favourites").insertMany(favourites);
  });
}

export default {
  save,
  findById,
  removeById,
  findByCredentials,
  getMyHistory,
  getMyRecentHistory,
  getMyFavourites,
  addItemToHistory,
  addItemToFavourites,
  populateHistoryAndFavourites,
};
