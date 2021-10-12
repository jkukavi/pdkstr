const { doSth } = require("../db");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

async function save(newPendingAccount) {
  let newAccountInfo = newPendingAccount.accountInfo;

  return doSth(async (db) => {
    const uniqueEmail = await checkIfUnique(db, newAccountInfo.email);
    if (!uniqueEmail) {
      throw new Error("Email already exists");
    }

    newAccountInfo = {
      ...newAccountInfo,
      password: await bcrypt.hash(newAccountInfo.password, 14),
      favourites: [],
      history: [],
    };

    newPendingAccount.accountInfo = newAccountInfo;

    return await db.collection("pendingAccounts").insertOne(newPendingAccount);
  });
}

async function removeById(id) {
  return doSth(async (db) => {
    return await db
      .collection("pendingAccounts")
      .deleteOne({ _id: ObjectId(id) });
  });
}

async function findOne({ id, activationCode }) {
  return doSth(async (db) => {
    return await db
      .collection("pendingAccounts")
      .findOne({ _id: ObjectId(id), activationCode });
  });
}

const checkIfUnique = async (db, email) => {
  const pendingAcc = await db
    .collection("pendingAccounts")
    .findOne({ "accountInfo.email": email });
  const user = await db.collection("users").findOne({ email });
  return !pendingAcc && !user;
};

module.exports = {
  save,
  removeById,
  findOne,
};
