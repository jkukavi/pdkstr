const { doSth } = require("../db");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

async function save(pendingAccount) {
  return doSth(async (db) => {
    const uniqueEmail = await checkIfUnique(
      db,
      pendingAccount.accountInfo.email
    );
    if (!uniqueEmail) {
      throw new Error("Email already exists");
    }

    await hashPassword(pendingAccount.accountInfo);

    pendingAccount.accountInfo.favourites = [];
    pendingAccount.accountInfo.history = [];

    return await db.collection("pendingAccounts").insertOne(pendingAccount);
  });
}

async function remove(pendingAccount) {
  return doSth(async (db) => {
    return await db
      .collection("pendingAccounts")
      .deleteOne({ _id: ObjectId(pendingAccount._id) });
  });
}

async function findOne(pendingAccountInfo) {
  return doSth(async (db) => {
    return await db.collection("pendingAccounts").findOne(pendingAccountInfo);
  });
}

const checkIfUnique = async (db, email) => {
  const pendingAcc = await db
    .collection("pendingAccounts")
    .findOne({ "accountInfo.email": email });
  const user = await db.collection("users").findOne({ email });
  return !pendingAcc && !user;
};

const hashPassword = async (accountInfo) => {
  const hashedPassword = await bcrypt.hash(accountInfo.password, 14);
  accountInfo.password = hashedPassword;
};

module.exports = {
  save,
  remove,
  findOne,
};
